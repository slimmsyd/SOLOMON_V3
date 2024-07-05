"use client";
import React, { useState, useEffect, useRef } from "react";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import Image from "next/image";
import arrowLeft from "../../../public/assets/Chat/arrowLeft.png";
import dynamic from "next/dynamic";

import LoadingComponent from "../components/helper/Loading";
import ButtonLoadingComponent from "../components/helper/buttonComponentLoading";

import { Dashboard } from "../chat/app/Dashboard";
import { ChatContainer } from "../chat/app/ChatContainer";
import { isClient } from "@/utilis/isClient";
import { useSessionStorage } from "../hooks/useSessionStorage";
import { Conversation } from "../../../types";

import { checkSession } from "@/utilis/CheckSession";
import { fetchUserInfo } from "@/utilis/fetchUserInfo";

import { greetings } from "@/utilis/randomGreeting";
import { useChatConversation } from "../hooks/ConversationContext";

//Images
import VirgoImage from "../../../public/assets/zodiacIcons/virgopng.png";
import ChatMessage from "../components/Chatmessage";

//Images to Channel
const Horoscope: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const {
    userName,
    setUserName,
    splitUserName,
    email,
    setEmail,
    setSplitUserName,
  } = useSessionStorage();


  const {
    responses,
    setResponses,
    message,
    setMessage,
    isFetchLoading,
    setIsFetchLoading,
  } = useChatConversation();


  const [messagesIsLoading, setMessagesIsLoading] = useState<null | boolean>(
    null
  );


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
            <h2>{greeting}</h2>
            <h2>welcome to dream interpeter</h2>
            <p id="greyText"> synopsis of your astrological energy </p>
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
                <h3>Dive into the meaning of dreams </h3>
                Discover some insights on the ether realm of where the dream
                resides. What is your subconsicous mind symbolizing? Why and
                what is this undiscoverd world.
              </div>

              <p></p>
            </div>
          </div>

          <div className="mt-[6rem]">
            <form
              ref={formRef}
              //   onSubmit={handleQuestionaireResponse}
              className="chatFormSubmit"
            >
              <div className="relative textAreaContainer">
                <textarea
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      formRef.current?.requestSubmit();
                    }
                  }}
                  value={message}
                  placeholder="Ask Thou Question..."
                ></textarea>

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

                  <button type="submit" className="textAreaIcon">
                    {messagesIsLoading ? (
                      <ButtonLoadingComponent />
                    ) : (
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
                    )}
                  </button>
                </div>
              </div>
            </form>

            {/* <ChatMessage
              shouldAnimate={false}
              response={{
                question: "",
                id: "",
                response:
                  "Based on your information provided, Solomon the wise was able to draw more conclusion on your across varies of culture to gain a more wholistic perspective Below or Images generated of your zodiac signs and there personality trains across different cultures. Best choice of action, take this information and ask me more in chat for more guidance on your unique being. You can click on each image to get a more in depth understanding of what they symbolized.",
              }}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Horoscope), { ssr: false });
