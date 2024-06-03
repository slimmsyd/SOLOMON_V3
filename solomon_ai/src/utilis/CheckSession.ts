"use client"
import { useRouter } from 'next/navigation';
import { getSession } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { Session } from 'next-auth';

interface CheckSessionOptions {
  setUserId: (id: string) => void;
  setUserName: (status: string) => void;
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
    setUserName,
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
    console.log("Logging the session ID", session)
    setUserId(session?.user.id);
    setSessionStatus(status);
    setUserName(session?.user.name)
    const currentSession = await getSession();
    console.log('Current session data:', currentSession);

    if (!currentSession?.user.user) {
      setEmail(currentSession?.user.email.split('@')[0]);
      console.log("Logging userName is the session jiont", userName)
      console.log("Logging teh current session userName in the joint", currentSession?.user.name)


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
      setUserName(currentSession?.user.name)
 
    }

  }
}
