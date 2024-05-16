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


export default function ChatDashboard() {
  //getting the user name

  const [userName, setUserName] = useState(null);
  const [splitUserName, seSplitUserName] = useState("");
  const router = useRouter();
  const { data: session, status } = useSession();

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
        setUserName(currentSession.user.username);
        if (!currentSession.user.user) {
          setUserName(currentSession.user.email.split("@")[0]);

          //We want to get Just to logo of the userName
          seSplitUserName(currentSession.user.email[0].toUpperCase());
        }
        console.log("Logging session user name", currentSession.user.username);
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

  if (!userName || !session) {
    return <ErrorPage />;
  }

  return (
    <>
      {/* <DashboardNav /> */}

      <div className="chatDashboard">
        <div className="chatContainer flex flex-col">
          <div className="flex flex-col gap-[22px]  h-full">
            {" "}
            <div className="flex flex-row">
              <div className="logoCircle"></div>
              <h3>Logo</h3>
            </div>
            <button className=" text-[14px] newChat flex flex-row items-center justify-center gap-[13px]">
              <div className="mainIcon">
                <Image src={arrowLeft} width={100} height={100} />
              </div>
              <p>New Chat</p>
            </button>
            <button className=" text-[14px] flex flex-row items-center justify-start gap-[13px] w-[135px] chatSearchIcon ">
              <div className="mainIcon">
                <Image src={searchIcon} width={100} height={100} />
              </div>

              <p>Dashboard</p>
            </button>
            <button className=" text-[14px] flex flex-row items-center justify-start gap-[13px] w-[135px] pl-[17px] ">
              <div className="mainIcon !w-[20px] !h-[20px]">
                <Image src={chatIcon} width={100} height={100} />
              </div>

              <p>Chats</p>
            </button>
            {/* Chat ICON layered right here  */}
            <div className=" chatRenderWrapper  flex flex-col items-start justify-start gap-[13px] w-full  ">
              <button className="flex flex-row pl-[19px] gap-[13px] ">
                <div className="mainIcon !w-[18px] !h-[18]">
                  <Image src={iconChat} width={100} height={100} />
                </div>

                <p className = "hover:text-white" >Life path Guide</p>
              </button>
              <button className="flex flex-row gap-[13px] pl-[19px] ">
                <div className="mainIcon !w-[18px] !h-[18]">
                  <Image src={iconChat} width={100} height={100} />
                </div>

                <p className = "hover:text-white" >Life path Guide</p>
              </button>

              <button className="flex flex-row gap-[13px] pl-[19px] ">
                <div className="mainIcon !w-[18px] !h-[18]">
                  <Image src={iconChat} width={100} height={100} />
                </div>

                <p className = "hover:text-white" >Life path Guide</p>
              </button>
            </div>
          </div>

          {/* Bottom Container */}

          <div className="flex flex-col gap-[22px]">
            {" "}
            <button className=" text-[14px] flex flex-row items-center justify-start gap-[13px] w-full pl-[17px] ">
              <div className="mainIcon !w-[20px] !h-[20px]">
                <Image src={chatIcon} width={100} height={100} />
              </div>

              <p>About Me</p>
            </button>
            <button className=" text-[14px] flex flex-row items-center justify-start gap-[13px] w-full pl-[17px] ">
              <div className="mainIcon !w-[20px] !h-[20px]">
                <Image src={chatIcon} width={100} height={100} />
              </div>

              <p>Numerology Guidance</p>
            </button>
            <button className=" text-[14px] flex flex-row items-center justify-start gap-[13px] w-full pl-[17px] ">
              <div className="mainIcon !w-[20px] !h-[20px]">
                <Image src={chatIcon} width={100} height={100} />
              </div>

              <p>Life path guidance </p>
            </button>
          </div>

          {/* Settings  Container */}

          <div className="flex flex-col gap-[4px] pt-[25px]">
            {" "}
            <button className=" text-[16px] flex flex-row items-center justify-start gap-[13px] w-full ">
              <p>Upgrade to pro</p>
            </button>
            <p id="greyText" className="text-[14px]">
              Upgrade for image upload, smarter AI, and more Pro Search.
            </p>
            <button className=" text-[14px] newChat flex flex-row items-center justify-center gap-[13px] mt-[12px]">
              <div className="mainIcon">
                <Image src={arrowLeft} width={100} height={100} />
              </div>
              <p>Learn more</p>
            </button>
          </div>

          {/* Profile  Container */}
          <div className="flex flex-row gap-[4px]  settingsContainer ">
            <button className=" text-[14px]  flex flex-row items-center justify-center gap-[13px] w-[135px]    ">
              <div className="mainIcon flex items-center justify-center">
                {splitUserName}
              </div>
              <p>{userName}</p>
            </button>


            <div className="mainIcon !w-[20px] !h-[20px]">
                  <Image src={settingsIcon} width={100} height={100} />
                </div>



          </div>
        </div>

        <div className="chatDashboardWrapper w-full text-left">
          <h2>Grand Rising, {userName}</h2>
          <h2>How may I guide?</h2>

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
