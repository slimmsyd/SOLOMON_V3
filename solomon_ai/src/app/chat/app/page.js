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
            <div className=" chatRenderWrapper relative  flex flex-col items-start justify-start gap-[13px] w-full  ">
              <button className="flex flex-row pl-[19px] gap-[13px] ">
                <div className="mainIcon !w-[18px] !h-[18]">
                  <Image src={iconChat} width={100} height={100} />
                </div>

                <p className="hover:text-white">Life path Guide</p>
              </button>
              <button className="flex flex-row gap-[13px] pl-[19px] ">
                <div className="mainIcon !w-[18px] !h-[18]">
                  <Image src={iconChat} width={100} height={100} />
                </div>

                <p className="hover:text-white">Life path Guide</p>
              </button>

              <button className="flex flex-row gap-[13px] pl-[19px] ">
                <div className="mainIcon !w-[18px] !h-[18]">
                  <Image src={iconChat} width={100} height={100} />
                </div>

                <p className="hover:text-white">Life path Guide</p>
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
          <div className="flex flex-row gap-[4px] justify-end self-end   settingsContainer !border-none !mt-0 ">
            <Link href="/" className="mainIcon !w-[20px] !h-[20px]">
              <svg
                width="16"
                height="16"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_3117_1799)">
                  <path
                    d="M10 1.80078C12.6719 1.80078 12.9883 1.8125 14.0391 1.85937C15.0156 1.90234 15.543 2.06641 15.8945 2.20313C16.3594 2.38281 16.6953 2.60156 17.043 2.94922C17.3945 3.30078 17.6094 3.63281 17.7891 4.09766C17.9258 4.44922 18.0898 4.98047 18.1328 5.95312C18.1797 7.00781 18.1914 7.32422 18.1914 9.99219C18.1914 12.6641 18.1797 12.9805 18.1328 14.0313C18.0898 15.0078 17.9258 15.5352 17.7891 15.8867C17.6094 16.3516 17.3906 16.6875 17.043 17.0352C16.6914 17.3867 16.3594 17.6016 15.8945 17.7813C15.543 17.918 15.0117 18.082 14.0391 18.125C12.9844 18.1719 12.668 18.1836 10 18.1836C7.32813 18.1836 7.01172 18.1719 5.96094 18.125C4.98438 18.082 4.45703 17.918 4.10547 17.7813C3.64063 17.6016 3.30469 17.3828 2.95703 17.0352C2.60547 16.6836 2.39063 16.3516 2.21094 15.8867C2.07422 15.5352 1.91016 15.0039 1.86719 14.0313C1.82031 12.9766 1.80859 12.6602 1.80859 9.99219C1.80859 7.32031 1.82031 7.00391 1.86719 5.95312C1.91016 4.97656 2.07422 4.44922 2.21094 4.09766C2.39063 3.63281 2.60938 3.29688 2.95703 2.94922C3.30859 2.59766 3.64063 2.38281 4.10547 2.20313C4.45703 2.06641 4.98828 1.90234 5.96094 1.85937C7.01172 1.8125 7.32813 1.80078 10 1.80078ZM10 0C7.28516 0 6.94531 0.0117187 5.87891 0.0585938C4.81641 0.105469 4.08594 0.277344 3.45313 0.523438C2.79297 0.78125 2.23438 1.12109 1.67969 1.67969C1.12109 2.23438 0.78125 2.79297 0.523438 3.44922C0.277344 4.08594 0.105469 4.8125 0.0585938 5.875C0.0117188 6.94531 0 7.28516 0 10C0 12.7148 0.0117188 13.0547 0.0585938 14.1211C0.105469 15.1836 0.277344 15.9141 0.523438 16.5469C0.78125 17.207 1.12109 17.7656 1.67969 18.3203C2.23438 18.875 2.79297 19.2188 3.44922 19.4727C4.08594 19.7188 4.8125 19.8906 5.875 19.9375C6.94141 19.9844 7.28125 19.9961 9.99609 19.9961C12.7109 19.9961 13.0508 19.9844 14.1172 19.9375C15.1797 19.8906 15.9102 19.7188 16.543 19.4727C17.1992 19.2188 17.7578 18.875 18.3125 18.3203C18.8672 17.7656 19.2109 17.207 19.4648 16.5508C19.7109 15.9141 19.8828 15.1875 19.9297 14.125C19.9766 13.0586 19.9883 12.7188 19.9883 10.0039C19.9883 7.28906 19.9766 6.94922 19.9297 5.88281C19.8828 4.82031 19.7109 4.08984 19.4648 3.45703C19.2188 2.79297 18.8789 2.23438 18.3203 1.67969C17.7656 1.125 17.207 0.78125 16.5508 0.527344C15.9141 0.28125 15.1875 0.109375 14.125 0.0625C13.0547 0.0117188 12.7148 0 10 0Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M10 4.86328C7.16406 4.86328 4.86328 7.16406 4.86328 10C4.86328 12.8359 7.16406 15.1367 10 15.1367C12.8359 15.1367 15.1367 12.8359 15.1367 10C15.1367 7.16406 12.8359 4.86328 10 4.86328ZM10 13.332C8.16016 13.332 6.66797 11.8398 6.66797 10C6.66797 8.16016 8.16016 6.66797 10 6.66797C11.8398 6.66797 13.332 8.16016 13.332 10C13.332 11.8398 11.8398 13.332 10 13.332Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M16.5391 4.66016C16.5391 5.32422 16 5.85938 15.3398 5.85938C14.6758 5.85938 14.1406 5.32031 14.1406 4.66016C14.1406 3.99609 14.6797 3.46094 15.3398 3.46094C16 3.46094 16.5391 4 16.5391 4.66016Z"
                    fill="currentColor"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0_3117_1799">
                    <rect width="20" height="20" fill="white"></rect>
                  </clipPath>
                </defs>
              </svg>{" "}
            </Link>
          </div>
        </div>
        <div className="chatDashboardWrapper w-full text-left">
          <h2>Grand Rising, {userName}</h2>
          <h2>How may I guide?</h2>
          <p id="greyText">
            Wisdom is a forever process, let us aid in the ways{" "}
          </p>

          {/* Render Cards/ Text will pouplate based on Quesitonaire  */}

          <div className="renderCardsWrapper flex flex-row gap-[23px] justify-start relative">
            <div className="renderCards relative">
              <p>Get your astrological predictions</p>

              <button className="renderAutoTextBtn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="none"
                  viewBox="0 0 32 32"
                  className="rotate-90"
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
            <div className="renderCards relative">
              <p>Calculate my life path number, and personal months meaning</p>

              <button className="renderAutoTextBtn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="none"
                  viewBox="0 0 32 32"
                  className="rotate-90"
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
            <div className="renderCards relative">
              <p>Calculate my life path number, and personal months meaning</p>

              <button className="renderAutoTextBtn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="none"
                  viewBox="0 0 32 32"
                  className="rotate-90"
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

            <div className="renderCards relative">
              <p>
                Breakdown “In the beginning was the world” from a Quantum
                perspective
              </p>

              <button className="renderAutoTextBtn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="none"
                  viewBox="0 0 32 32"
                  className="rotate-90"
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

              <button className="textAreaIcon">
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
    </>
  );
}
