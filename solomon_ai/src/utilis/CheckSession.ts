"use client";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";

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

  if (status === "loading") {
    return;
  }

  if (status === "unauthenticated") {
    console.log("No session found, redirecting...");
    router.push("/");
  } else if (!session?.user) {

    console.log("Logging the session in check sessION", session)
    router.push("/");
  } else if (status === "authenticated") {
    setUserId(session?.user.id);
    setSessionStatus(status);
    setUserName(session?.user.name);
    const currentSession = await getSession();

    if (!currentSession?.user.user) {
      setEmail(currentSession?.user.email.split("@")[0]);

      if (isClient()) {
        if (email !== null) {
          sessionStorage.setItem(
            "email",
            currentSession?.user.email.split("@")[0]
          );
        }
        if (userName !== null) {
          sessionStorage.setItem("userName", currentSession?.user.name);
        }
        if (splitUserName !== "") {
          sessionStorage.setItem("splitUserName", splitUserName);
        }
      }

      setSplitUserName(currentSession?.user.email[0].toUpperCase());
    }
  }
}
