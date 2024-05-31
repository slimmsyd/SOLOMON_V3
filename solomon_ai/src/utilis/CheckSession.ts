"use client"
import { useRouter } from 'next/navigation';
import { getSession } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { Session } from 'next-auth';

interface CheckSessionOptions {
  setUserId: (id: string) => void;
  setSessionStatus: (status: string) => void;  
  setEmail: (email: string) => void;
  setSplitUserName: (splitUserName: string) => void;
  isClient: () => boolean;
  session?: Session | null; // Add session to the interface
  router: ReturnType<typeof useRouter>; // Correct type for router
  email: string;
  userName: string;
  splitUserName: string;
}

export async function checkSession(
  status: string,
  options: CheckSessionOptions
) {
  const {
    setUserId,
    setSessionStatus,
    setEmail,
    setSplitUserName,
    isClient,
    session,
    router,
    email,
    userName,
    splitUserName,
  } = options;

//   const router = useRouter();

  if (status === 'loading') {
    console.log('Session is loading...');
    return;
  }

  if (status === 'unauthenticated') {
    console.log('No session found, redirecting...');
    router.push('/');
  } else if (status === 'authenticated') {
    console.log('Session is authenticated, confirming session data...', status);

    setUserId(session?.user.id);
    setSessionStatus(status);
    const currentSession = await getSession();
    console.log('Current session data:', currentSession);

    if (!currentSession?.user.user) {
      setEmail(currentSession?.user.email.split('@')[0]);

      if (isClient()) {
        if (email !== null) {
          sessionStorage.setItem('email', email);
          console.log('Is the email being set here', email);
        }
        if (userName !== null) {
          sessionStorage.setItem('userName', userName);
        }
        if (splitUserName !== '') {
          sessionStorage.setItem('splitUserName', splitUserName);
        }
      }

      setSplitUserName(currentSession?.user.email[0].toUpperCase());
    }
    console.log('Logging session user name', currentSession?.user.name);
  }
}
