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

  if (status === "loading") {
    console.log("LOADING LOADING");
    return;
  }

  if (status === "unauthenticated") {
    console.log("No session found, redirecting...");
    window.alert("No session found")
    router.push("/");
  } else if (!session?.user) {
    window.alert("No session User")

    console.log("Logging the session in check sessION", session);
    router.push("/");
  } else if (status === "authenticated") {
    console.log("Status is authenticated");
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

      // Check if the user has an active subscription
      try {
        const res = await fetch("/api/get-subscription-id", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: session?.user.id }),
        });
        const data = await res.json();

        if (!data.paymentIntentId) {
          console.log("User does not have an active subscription, redirecting...");
          router.push("/");
        } else {
          console.log("User has an active subscription");
        }
      } catch (error) {
        console.error("Error fetching subscription ID:", error);
        router.push("/"); // Redirect to home if there is an error fetching subscription ID
      }
    }
  }
}
