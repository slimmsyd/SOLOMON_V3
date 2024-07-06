"use client";
import React, { useState, useEffect, useRef, FormEvent } from "react";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Session } from "next-auth";

import ButtonLoadingComponent from "../components/helper/buttonComponentLoading";

import { DreamDashboard } from "./DreamDashboard";
import { Header } from "../components/Header";
import { ChatMessagesContainer } from "../chat/app/ChatMessage";

import { ChatContainer } from "../chat/app/ChatContainer";
import { isClient } from "@/utilis/isClient";
import { useSessionStorage } from "../hooks/useSessionStorage";
import { Conversation } from "../../../types";
import { Message } from "../../../types";

import { checkSession } from "@/utilis/CheckSession";
import { fetchUserInfo } from "@/utilis/fetchUserInfo";

import { greetings } from "@/utilis/randomGreeting";
import { useChatConversation } from "../hooks/ConversationContext";

//Images
import VirgoImage from "../../../public/assets/zodiacIcons/virgopng.png";
import ChatMessage from "../components/Chatmessage";

import useCreateConversation from "../hooks/createConversation";
import LoadingComponent from "../components/helper/Loading";

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

  const [currentConversationId, setCurrentConversationId] = useState<
    number | string | null
  >(null);

  const {
    createConversation,
    newTitle,
    setNewTitle,
    isCreateLoading,
    error,
    dataId,
  } = useCreateConversation(
    session as Session,
    setConversations as any,
    setCurrentConversationId
  );

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

  const [dreamLocalStorage, setDreamLocalStorage] = useState(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessagesIsLoading(true);
    console.log("Logging Conversation Id in the Submit", currentConversationId);
    if (isClient()) {
      if (!currentConversationId) {
        console.log("No conversation selected.");

        await createConversation().then((convoID) => {
          console.log("Logging the CONVO ID", convoID);

          setCurrentConversationId(convoID); // Store the convo ID if needed
          sessionStorage.setItem("currentConversationId", convoID);
          sessionStorage.setItem("dreamConversationID", convoID);
          let localStorageConvoId: any;
          let dreamLocalStorageConvoId: any;
          localStorage.setItem("currentConversationId", convoID);
          localStorage.setItem("dreamConversationID", convoID);

          localStorageConvoId = localStorage.getItem("currentConversationId");
          dreamLocalStorageConvoId = localStorage.getItem(
            "dreamConversationID"
          );

          setDreamLocalStorage(dreamLocalStorageConvoId);
        });
      }

      // Ensure that currentConversationId is updated before proceeding
      const updatedConversationId = sessionStorage.getItem(
        "currentConversationId"
      );

      console.log(
        "Logging the updated conversationalID",
        updatedConversationId
      );

      // 1. Set up the new response without any bot response yet.
      // 1. Set up the new response without any bot response yet.
      const newResponse = {
        question: message,
        response: "",
        id: "temp",
      };

      // Use functional update for state
      setResponses((responses) => [...responses, newResponse]);

      // Fetch user information if not available in session storage
      const userInfo = await fetchUserInfo(userId);

      setMessage("");

      try {
        // 2. Fetch bot reply from the API
        const botReply = await fetch("api/dreamBot", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            userId,
            message,
            conversationId: updatedConversationId,
            userInfo, // Send userInfo object
          }),
        }).then((res) => res.json());
        setMessagesIsLoading(false);

        setResponses((prevResponses) =>
          prevResponses.map((resp) => {
            if (resp.question === message) {
              return { ...resp, response: botReply.message, id: botReply };
            }
            return resp;
          })
        );

        console.log(
          "Loggign the current Conversation on a new click ",
          currentConversationId
        );

        //Add the conversations arrawy or update
      } catch (error) {
        console.error("Error handling submission:", error);
      }
    }
  };

  //Save the dreamLocal Storage State
  //Fetch if there a dream storageID to go by
  useEffect(() => {
    let dreamStorage;
    const dreamSessionStorage = sessionStorage.getItem("dreamConversationID");
    const localDreamStorage = localStorage.getItem("dreamConversationID");
    if (dreamSessionStorage) {
      setDreamLocalStorage(dreamSessionStorage as any);
      dreamStorage = dreamSessionStorage;
    } else if (localDreamStorage) {
      setDreamLocalStorage(localDreamStorage as any);
      dreamStorage = localDreamStorage;
    }

    if (dreamLocalStorage === localDreamStorage) {
    }

  }, [dreamLocalStorage]);

  useEffect(() => {
 

  }, []);

  const messagesRefCounter = useRef(0);
  useEffect(() => {

  }, [messagesRefCounter]);
  const fetchMessagesForConversation = async (conversationId: string) => {
    messagesRefCounter.current += 1;
    if (messagesRefCounter.current > 1) {
      return;
    }


    console.log("Logging fetch before checking for session")
    console.log("Logging the fech before sessioon with ID",conversationId )

    if (!session || !session.user || !session.user.id) {
      console.error("No user session available")
      return;
    }
    setMessagesIsLoading(true);


    console.log("Logging the session Id after return", session?.user.id)

    if (!conversationId) {
      console.error("no conversatoin ID");
      return;
    } else {
      try {
   
        const response = await fetch(
          `/api/storedMessages?authorId=${session?.user.id}&conversationId=${conversationId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch messages");
        }
        const messages = await response.json();

        console.log("Logging response on return", response)
        console.log("Logging the fetch messages on return", messages)



        // Map API response to expected format in state
        //Naming conventions matter
        const formattedMessages = messages.map((msg: Message) => ({
          question: msg.userContent,
          response: msg.botResponse,
          id: msg.id,
        }));

    
        setResponses([]);

        if (response.ok) {
          setResponses(formattedMessages);
        }
        setMessagesIsLoading(false);
      } catch (error) {
        setMessagesIsLoading(true);
        console.error("Error fetching messages:", error);
      }
    }
  };

  let localStorageConvoId: any;

  useEffect(() => {
    if (localStorage.getItem("dreamConversationID")) {
      localStorageConvoId = localStorage.getItem("dreamConversationID");
      setCurrentConversationId(localStorageConvoId);
    }
  }, []);

  useEffect(() => {
    setResponses([]); // Clear previous messages



    let dreamStorage;
    const dreamSessionStorage = sessionStorage.getItem("dreamConversationID");
    const localDreamStorage = localStorage.getItem("dreamConversationID");
    if (dreamSessionStorage) {
      setDreamLocalStorage(dreamSessionStorage as any);
      dreamStorage = dreamSessionStorage;
    } else if (localDreamStorage) {
      setDreamLocalStorage(localDreamStorage as any);
      dreamStorage = localDreamStorage;

    }

 
      // Fetch messages for the current conversation if needed
      if (currentConversationId === null) {
        console.log("Logging the fetch convo before", currentConversationId)
        fetchMessagesForConversation(
          (currentConversationId as any) || localStorageConvoId
        );
      } else {
        fetchMessagesForConversation(
            (currentConversationId as any) || localStorageConvoId
          );
        console.log("Fech is doing good", currentConversationId);
      }
  }, [currentConversationId]);
  
  

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
        <Header handleMobileChatBtnClick={handleMobileChatBtnClick} />
        <DreamDashboard greeting={greeting} />

        {/* Dashboard Component  */}

        <div className="chatDashBoardContainer">
          {currentConversationId || dreamLocalStorage ? (
            <ChatMessagesContainer responses={responses || "null"} />
          ) : (
                <LoadingComponent />
          )}
        </div>

        <div className="mt-[6rem]">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
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
  );
};

export default dynamic(() => Promise.resolve(Horoscope), { ssr: false });
