"use client";
import React, { useState, useEffect, useRef } from "react";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import Image from "next/image";
import arrowLeft from "../../../public/assets/Chat/arrowLeft.png";
import dynamic from "next/dynamic";


import { ChatContainer } from "../chat/app/ChatContainer";
import { isClient } from "@/utilis/isClient";
import { useSessionStorage } from "../hooks/useSessionStorage";
import { Conversation } from "../../../types";

import { checkSession } from "@/utilis/CheckSession";
import { fetchUserInfo } from "@/utilis/fetchUserInfo";

import { greetings } from "@/utilis/randomGreeting";

//Helper functions 
import { cleanText } from "@/utilis/cleanText";

//Images
import VirgoImage from "../../../public/assets/zodiacIcons/virgopng.png";

import { TodaysContainer } from "./todayHoroscope";
import { YesterdayContainer } from "./yesterdayHoroscope";
import { MonthlyContainer } from "./monthlyHorscope";
import { WeeklyContainer } from "./weeklyHoroscope";
import { AnnualContainer } from "./annualHoroscope";
//Images to Channel
const Horoscope: React.FC = () => {
  const {
    userName,
    setUserName,
    splitUserName,
    email,
    setEmail,
    setSplitUserName,
  } = useSessionStorage();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  const [zodiac, setZodiac] = useState<string>("");

  const [currentDiv, setCurrentDiv] = useState("Today"); // Initialize with the first button
  const [greeting, setGreeting] = useState<string>("");
  const getRandomGreeting = () => {
    return greetings[Math.floor(Math.random() * greetings.length)];
  };
  useEffect(() => {
    setGreeting(getRandomGreeting());
  }, [greeting]);

  const router = useRouter();
  const { data: session, status } = useSession();
  const [sessionStatus, setSessionStatus] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [currentConversationId, setCurrentConversationId] = useState<
    string | null
  >(null);

  //Capture the loading of the infrmation
  const [dataLoading, setDataLoading] = useState<boolean>(false);

  useEffect(() => {
    checkSession(status, {
      setUserId,
      setUserName,
      setSessionStatus,
      setEmail,
      setSplitUserName,
      isClient,
      session,
      router,
      email,
      userName: "",
      splitUserName,
    });
  }, [status]);

  //This funcitno shifts and shows the mobile Chat ccontainer
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isAtZero, setIsAtZero] = useState<boolean>(false); // State to track the position

  const handleMobileChatBtnClick = () => {
    if (chatContainerRef.current) {
      if (isAtZero) {
        chatContainerRef.current.style.transform = "translateX(-100%)";
      } else {
        chatContainerRef.current.style.transform = "translateX(0px)";
      }
      setIsAtZero(!isAtZero); // Toggle the state
    }
  };

  // Effect to handle viewport resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 950 && chatContainerRef.current) {
        chatContainerRef.current.style.transform = "translateX(0px)";
        setIsAtZero(false); // Reset the state
      } else if (chatContainerRef.current) {
        chatContainerRef.current.style.transform = "translateX(-100%)";
        setIsAtZero(true); // Reset the state
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //Run the fetchUserInfo on Remout only
  useEffect(() => {
    fetchUserInfo(session?.user.id);
  }, []);
  useEffect(() => {
    const getUserInfo = async () => {
      const userInfo = await fetchUserInfo(userId);
      setDataLoading(true);

      if (userInfo) {
        const { zodiacSign } = userInfo;

        setZodiac(zodiacSign);
      }
    };

    getUserInfo();
  }, [userId]);


  useEffect(() => {}, [zodiac]);

  // Update session storage whenever userName or splitUserName changes
  useEffect(() => {
    if (isClient()) {
      if (userName !== null) {
        sessionStorage.setItem("userName", userName || session?.user.name);
      }

      if (splitUserName !== "") {
        sessionStorage.setItem("splitUserName", splitUserName);
      }

      if (email !== null) {
        sessionStorage.setItem("email", email);
      }
    }
  }, [userName, splitUserName]);

  const handleConversationClick = (convoId: string) => {
    const targetPath = `/chat/app/${session?.user.id}/${convoId}`;

    router.push(targetPath, undefined);
    setCurrentConversationId(convoId);
  };

  useEffect(() => {
    // Retrieve the conversations from session storage
    const localStorageConversations = sessionStorage.getItem("conversations");

    if (localStorageConversations) {
      const conversationArray: Conversation[] = JSON.parse(
        localStorageConversations
      );
      if (conversationArray.length > 0) {
        setConversations?.(conversationArray); // Safe call with optional chaining
      }
    }
  }, [setConversations]);

  const containerRef = useRef(null);
  const [lineStyle, setLineStyle] = useState({ left: "0px" });
  useEffect(() => {
    // Initialize the transition line position to the first button on mount
    const firstButton = (containerRef as any).current.querySelector("button");
    if (firstButton) {
      moveTransitionLine(firstButton);
    }
  }, []);

  const moveTransitionLine = (button) => {
    const buttonRect = button.getBoundingClientRect();
    const containerRect = (containerRef as any).current.getBoundingClientRect();

    const offsetLeft = buttonRect.left - containerRect.left;

    setLineStyle({ left: `${offsetLeft}px` });
    setCurrentDiv(button.textContent);
  };

  useEffect(() => {
    console.log("Logging the CUrrent Div", currentDiv);
  }, [lineStyle, currentDiv]);

  const days = ["Today", "Yesterday", "Weekly", "Monthly", "Annually"];

  //Handling the peroannl year

  return (
    <div className="chatDashboard">
      <ChatContainer
        setConversations={setConversations}
        conversations={conversations}
        splitUserName={splitUserName}
        userName={userName || ""}
        email={email || ""}
        onConversationClick={handleConversationClick}
        chatContainerRef={chatContainerRef as any}
        handleMobileChatBtnClick={handleMobileChatBtnClick}
      />
      {/* Chat Container Componet  */}

      <div className="chatDashboardWrapper !h-full w-full text-left">
        {/* Guidelines Hader */}

        <header className=" text-[14px] guideLinesContainer gap-[8px] h-[70px] flex flex-row items-center justify-end w-full px-[22px] mb-[50px]">
          <div className=" flex-1   cursor-pointer mobileChatContainer">
            <div
              onClick={handleMobileChatBtnClick}
              className=" mobileChatBtn flex items-center justify-start"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M112,60a16,16,0,1,1,16,16A16,16,0,0,1,112,60Zm16,52a16,16,0,1,0,16,16A16,16,0,0,0,128,112Zm0,68a16,16,0,1,0,16,16A16,16,0,0,0,128,180Z"></path>
              </svg>
            </div>
          </div>
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

        <div className="chatDashBoardContainer ">
          <div className=" pb-[2rem] relative">
            <h2>
              {greeting}, {userName}
            </h2>
            <h2>welcome</h2>
            <p id="greyText">synopsis of your astrological energy </p>
          </div>

          <div className="color-div text-[#4C35DE]">
            <div className="flex flex-row gap-[5px] items-start">
              <svg
                width="32"
                height="32"
                viewBox="0 0 20 20"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#4C35DE"
                  d="M18.695 12.33l-1.932-.516A7.014 7.014 0 0017 10c0-.63-.083-1.237-.237-1.814l1.932-.516c.2.743.305 1.524.305 2.33a9.01 9.01 0 01-.305 2.33zm-.9-6.83l-1.73 1a7.044 7.044 0 00-2.566-2.564l1.002-1.732A9.044 9.044 0 0117.796 5.5zM12.33 1.304l-.516 1.932A7.012 7.012 0 0010 3c-.63 0-1.237.083-1.814.237L7.67 1.305A9.012 9.012 0 0110 1c.806 0 1.587.106 2.33.305zm-6.83.9l1 1.73a7.044 7.044 0 00-2.564 2.566L2.204 5.499A9.044 9.044 0 015.5 2.204zM1.304 7.67A9.012 9.012 0 001 10c0 .806.106 1.587.305 2.33l1.932-.516A7.012 7.012 0 013 10c0-.63.083-1.237.237-1.814L1.305 7.67zm.9 6.83l1.73-1a7.044 7.044 0 002.566 2.564l-1.002 1.732A9.044 9.044 0 012.204 14.5zm5.465 4.195l.516-1.932A7.014 7.014 0 0010 17c.63 0 1.238-.083 1.814-.237l.516 1.932A9.01 9.01 0 0110 19a9.011 9.011 0 01-2.33-.305zm6.83-.9l-1-1.73a7.043 7.043 0 002.564-2.566l1.732 1.002a9.043 9.043 0 01-3.295 3.295z"
                ></path>
              </svg>

              <div className="flex flex-col gap-[5px]">
                <h3>Explore your horoscopes</h3>
                Discover detailed insights into your daily horoscopes. With unique perspective and insights by our trained Solomon AI Metaphysical
                predictions.
              </div>

              <p></p>
            </div>
          </div>

          <div className="flex flex-col gap-[15px py-[100px]">
            <div
              className="flex flex-row gap-[25px] text-white pb-[7px] relative"
              ref={containerRef as any}
            >
              <div className="relative">
                <button onClick={(e) => moveTransitionLine(e.target)}>
                  Today
                </button>
                <div style={lineStyle} className="transitionLine"></div>
              </div>
              {/* <div className="relative">
                <button onClick={(e) => moveTransitionLine(e.target)}>
                  Yesterday
                </button>
              </div> */}
              {/* <div className="relative">
                <button onClick={(e) => moveTransitionLine(e.target)}>
                  Weekly
                </button>
              </div>
              <div className="relative">
                <button onClick={(e) => moveTransitionLine(e.target)}>
                  Monthly
                </button>
              </div> */}
              {/* <div className="relative">
                <button onClick={(e) => moveTransitionLine(e.target)}>
                  Annually
                </button>
              </div> */}
            </div>

            <div className="color-div text-[#4C35DE]">
              <div className="flex flex-row gap-[5px] items-start">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#4C35DE"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M10 13.8l-3.8 2.1c-.2.2-.5 0-.6-.1l-.1-.4 1-4.1-3.3-2.8a.5.5 0 010-.7c0-.1.1-.2.3-.2l4.3-.4 1.7-3.9a.5.5 0 011 0l1.7 3.9 4.3.4c.3 0 .5.3.5.5s0 .3-.2.4l-3.3 2.8 1 4.1c0 .3-.1.5-.4.6h-.3L10 13.7z"
                  ></path>
                </svg>

                <div className="flex flex-col gap-[5px]">
                  Tap into the pattern approach of the cosmos to align your
                  decisions with the stars, “As above , so below”.
                </div>

                <p></p>
              </div>
            </div>
          </div>

          {/* Conditional rendering based on currentDiv */}
          {currentDiv === "Today" && <TodaysContainer zodiacSign={zodiac}
            period = {"day"}
          />}
          {currentDiv === "Yesterday" && (
            <YesterdayContainer zodiacSign={zodiac}
            period = {"yesterday"}
            />
          )}
          {/* {currentDiv === "Weekly" && <WeeklyContainer zodiacSign={zodiac} 
            period = {"week"}
          />}
          {currentDiv === "Monthly" && <MonthlyContainer zodiacSign={zodiac} 
            period = {"month"}

          />}
          {currentDiv === "Annually" && <AnnualContainer zodiacSign={zodiac} />} */}
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Horoscope), { ssr: false });
