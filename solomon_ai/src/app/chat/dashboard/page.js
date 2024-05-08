"use client";

import DashboardNav from "../../components/DashboardNav";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSession, getSession } from "next-auth/react";
import ErrorPage from "../../error/page";
export default function ChatDashboard() {
  //getting the user name

  const [userName, setUserName] = useState(null);
  const router = useRouter();
  const { data: session, status } = useSession();



  useEffect(() => {
    async function checkSession() {
      if (status === "loading") {
        console.log("Session is loading...");
        return;
      }

      if (status === "unauthenticated") {
        console.log("No session found, redirecting...");
        router.push("/");
      } else if (status === "authenticated") {
        console.log("Session is authenticated, confirming session data...", status);
        const currentSession = await getSession();
        console.log("Current session data:", currentSession);
        setUserName(currentSession.user.username);
        console.log("Logging session user name", currentSession.user.username);
      }
    }

    checkSession();
  }, [status, router]);

  useEffect(() => {
    // This effect runs only on the client side
    const storedUsername = typeof window !== "undefined" ? localStorage.getItem("username") : null;
    if (storedUsername) {
      setUserName(storedUsername);
    }
  }, []);

  if (!userName || !session) {
    return <ErrorPage />;
  }

  {
    return (
      <>
        <DashboardNav />
        <div className="chatDashboard">
          <div className="chatDashboardWrapper">
            <h1>Grand Rising, {userName}</h1>

            <div className="chatDashboardForm">
              <input
                className="chatDashboardInput"
                placeholder="How may I aid.."
              ></input>

              <Link
                href="/chat"
                className="dashboardBtn posAbs flex items-start justify-center"
              >
                Stat chat
              </Link>

              <div className="dashboardNews">
                <h3>
                  Begin an exploration into collective spirtual understanding
                </h3>

                <h2>
                  This model is beta test and is currently trained to give
                  synthesized answers regarding spirtuality.
                </h2>

                <div className="dashboardTag">
                  <span>Oracle AI</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
