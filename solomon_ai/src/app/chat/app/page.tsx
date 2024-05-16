"use client";

import DashboardNav from "../../components/DashboardNav";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useSession, getSession } from "next-auth/react";
import ErrorPage from "../../error/page";

import Image from "next/image";
import arrowLeft from "../../../../public/assets/Chat/arrowLeft.png";
import searchIcon from "../../../../public/assets/Chat/searchIcon.png";
import chatIcon from "../../../../public/assets/Chat/chatIcon.png";
import iconChat from "../../../../public/assets/Chat/iconChat.png";
import settingsIcon from "../../../../public/assets/Chat/settingsIcon.png";

// Dashboard
import { Dashboard } from "./Dashboard";
//Chat Container
import { ChatContainer } from "./ChatContainer";
export default function ChatDashboard() {
  //getting the user name

  const [userName, setUserName] = useState<string | null>(null);
  const [splitUserName, setSplitUserName] = useState<string>("");
  const [email, setEmail] = useState<string | null>(null);
  const router = useRouter();
  const { data: session, status } = useSession();



  useEffect(() => {
    const storedUserName = sessionStorage.getItem('userName');
    const storedSplitUserName = sessionStorage.getItem('splitUserName');
    const storedEmail = sessionStorage.getItem("email")

    if (storedUserName) {
      setUserName(storedUserName);
    }

    if(email){
      setEmail(storedEmail)
  }


    if (storedSplitUserName) {
      setSplitUserName(storedSplitUserName);
    }
  }, []);

    // Update session storage whenever userName or splitUserName changes
    useEffect(() => {
      if (userName !== null) {
        sessionStorage.setItem('userName', userName);
      }


  
      if (splitUserName !== "") {
        sessionStorage.setItem('splitUserName', splitUserName);
      }
    }, [userName, splitUserName]);
  
  

  useEffect(() => {
    async function checkSession() {
      console.log("Logging ession", session);
      if (status === "loading") {
        console.log("Session is loading...");
        return;
      }

      if (status === "unauthenticated") {
        console.log("No session found, redirecting...");
        router.push("/");
      } else if (status === "authenticated") {
        console.log(
          "Session is authenticated, confirming session data...",
          status
        );
        const currentSession = await getSession();
        console.log("Current session data:", currentSession);
        setUserName(currentSession?.user.username);
        if (!currentSession?.user.user) {
          setUserName(currentSession?.user.email.split("@")[0]);

          //We want to get Just to logo of the userName
          setSplitUserName(currentSession?.user.email[0].toUpperCase());
        }
        console.log("Logging session user name", currentSession?.user.username);
      }
    }

    checkSession();
  }, [status, router]);

  useEffect(() => {
    // This effect runs only on the client side
    const storedUsername =
      typeof window !== "undefined" ? localStorage.getItem("username") : null;
    if (storedUsername) {
      setUserName(storedUsername);
    }
  }, []);

  // if (!userName || !session) {
  //   return <ErrorPage />;
  // }

  return (
    <>
      {/* <DashboardNav /> */}

      <div className="chatDashboard">
        {/* Chat Container Componet  */}

        <ChatContainer splitUserName={splitUserName} userName={userName} />

        {/* Chat Container Componet  */}

        <div className="chatDashboardWrapper w-full text-left">
          {/* Guidelines Hader */}

          <header className=" text-[14px] guideLinesContainer gap-[8px] h-[70px] flex flex-row items-center justify-end w-full px-[22px] mb-[50px]">
            <div className="flex flex-row gap-[18px] items-center justify-center">
              <button className="hover:text-[#807f7f]">Tour</button>

              <button className="flex flex-row guideLinesBtn gap-[10px] hover:bg-[#4B4B4B]">
                <svg
                  width="15"
                  height="15"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="far"
                  data-icon="compass"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="#2F0FFD"
                    d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm306.7 69.1L162.4 380.6c-19.4 7.5-38.5-11.6-31-31l55.5-144.3c3.3-8.5 9.9-15.1 18.4-18.4l144.3-55.5c19.4-7.5 38.5 11.6 31 31L325.1 306.7c-3.2 8.5-9.9 15.1-18.4 18.4zM288 256a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"
                  ></path>
                </svg>
                Guidlines
              </button>
            </div>
          </header>

          <div className="chatDashBoardContainer">
            {/* Dashboard Component  */}
            <Dashboard userName={userName} />
            {/* Dashboard Component  */}

            <form className="chatFormSubmit">
              <div className="relative textAreaContainer">
                <textarea placeholder="Ask Thou Question..."></textarea>

                <div className="textAreaIconWrapper flex flex-row gap-[11px]">
                  <button className="textAreaIcon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        fill-rule="evenodd"
                        d="M9 7a5 5 0 0 1 10 0v8a7 7 0 1 1-14 0V9a1 1 0 0 1 2 0v6a5 5 0 0 0 10 0V7a3 3 0 1 0-6 0v8a1 1 0 1 0 2 0V9a1 1 0 1 1 2 0v6a3 3 0 1 1-6 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </button>

                  <button 
                  
                  type ="submit"
                  className="textAreaIcon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="none"
                      viewBox="0 0 32 32"
                      className=""
                    >
                      <path
                        fill="currentColor"
                        fill-rule="evenodd"
                        d="M15.192 8.906a1.143 1.143 0 0 1 1.616 0l5.143 5.143a1.143 1.143 0 0 1-1.616 1.616l-3.192-3.192v9.813a1.143 1.143 0 0 1-2.286 0v-9.813l-3.192 3.192a1.143 1.143 0 1 1-1.616-1.616z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
