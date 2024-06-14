"use client";

import styles from "../../../../styles/chat.module.css";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

import React, { useState, useEffect, useRef, use, useId } from "react";
import Link from "next/link";
import { useSession, getSession } from "next-auth/react";
import { Session } from "next-auth";
import { Message } from "../../../../../types";

import dynamic from "next/dynamic";
import axios from "axios";

import { isClient } from "@/utilis/isClient";

//Helper functions
import ButtonLoadingComponent from "@/app/components/helper/buttonComponentLoading";

// Dashboard

import { useChatConversation } from "@/app/hooks/ConversationContext";
import useCreateConversation from "@/app/hooks/createConversation";
import useConversations from "@/app/hooks/useConversations";
//Chat Container
import { ChatContainer } from "../ChatContainer";
import { SignupForm } from "../Signupform";

import { useSessionStorage } from "@/app/hooks/useSessionStorage";

//Importing the Zodiac Signs ++ Helper functions
import { extractLifePathNumber } from "@/utilis/textExtractor";
import { extractZodiacSign } from "@/utilis/textExtractor";
import { extractBirthday } from "@/utilis/textExtractor";
import { extractEnnealogyNumber } from "@/utilis/textExtractor";
import { extractReligion } from "@/utilis/textExtractor";
import { checkCompletionText } from "@/utilis/textExtractor";

import { greetings } from "@/utilis/randomGreeting";
import { checkSession } from "@/utilis/CheckSession";

import { parseDateString } from "@/utilis/updateUserUtils";
import { calculateLifePathNumber } from "@/utilis/updateUserUtils";
import { calculateEnnealogyNumber } from "@/utilis/updateUserUtils";

import LoadingComponent from "@/app/components/helper/Loading";

const ChatDashboard: React.FC = () => {
  //getting the user name

  const questionBotApi =
    "https://biewq9aeo5.execute-api.us-east-1.amazonaws.com/dev/chatbot";

  //First introduction From
  const [completedForm, setCompleteForm] = useState<boolean>(false);

  const {
    userName,
    setUserName,
    splitUserName,
    email,
    setEmail,
    setSplitUserName,
  } = useSessionStorage();

  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [sessionStatus, setSessionStatus] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  // Form Ref
  const formRef = useRef<HTMLFormElement>(null);

  const [currentConversationId, setCurrentConversationId] = useState<
    number | string | null
  >(null);

  const [messagesIsLoading, setMessagesIsLoading] = useState<null | boolean>(
    null
  );

  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const [borderClasses, setBorderClasses] = useState<string[]>([
    "selectedBorder",
    "noneBorder",
    "noneBorder",
    "noneBorder",
    "noneBorder",
    "noneBorder",
  ]);

  //Stores the Chat
  const {
    responses,
    setResponses,
    message,
    setMessage,
    isFetchLoading,
    setIsFetchLoading,
  } = useChatConversation();

  const { conversations, isLoading, setConversations } = useConversations(
    session as Session
  );

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

  //Getting  access to the currnet conversation ID
  useEffect(() => {
    const currentConvoId = sessionStorage.getItem("currentConvoId");
    if (currentConvoId) {
      setCurrentConversationId(currentConvoId as any);
    }

    console.log("Logging the current Convo in the useEffect", currentConvoId);
  }, []);

  // Update session storage whenever userName or splitUserName changes
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
      userName,
      splitUserName,
    });
  }, [status]);

  // Example border classes
  useEffect(() => {
    console.log("Logging the current question", currentQuestion);
  }, [currentQuestion]);

  const [readyToRedirect, setReadyToRedirect] = useState(false);
  useEffect(() => {
    console.log("Logging to see if ready to redirect", readyToRedirect);
  }, [readyToRedirect]);

  const handleNextQuestion = async () => {
    if (currentQuestion < 6) {
      const updatedResponses = [
        ...responses,
        `Response to question ${currentQuestion}`,
      ]; // Example response

      console.log("Logging the update responses", updatedResponses);

      const newBorderClasses = [...borderClasses];
      newBorderClasses[currentQuestion] = "selectedBorder"; // Update the border class for the current question
      setBorderClasses(newBorderClasses);

      const newCurrentQuestion = currentQuestion + 1;
      const isComplete = newCurrentQuestion >= 6;
      setCurrentQuestion(newCurrentQuestion);

      try {
        const response = await axios.post("/api/saveProgress", {
          userId,
          currentQuestion: newCurrentQuestion,
          responses: updatedResponses,
          onComplete: isComplete, // Include the onComplete status in the request
        });

        if (response.data.data.currentQuestion === 6) {
          console.log("The form has been completed", response.data.data);
          setCompleteForm(true);
        }

        if (response.data.data.onComplete) {
          setCompleteForm(true);
        }

        if (completedForm) {
          setCompleteForm(true);
        }

        if (isComplete) {
          setReadyToRedirect(false);
        }
      } catch (error) {
        console.error("Error saving progress:", error);
      }
    } else if (readyToRedirect) {
      // router.push("/chat/app/");
    }
  };

  useEffect(() => {}, [completedForm]);

  //Fetch the Progress
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await axios.get(`/api/getProgress`, {
          params: { userId },
        });

        if (response.data) {
          setCurrentQuestion(response.data.currentQuestion);
          setCompleteForm(response.data.onComplete);
          console.log("Logging hte response of setComplte", response.data);
          // Update borderClasses based on the responses length
          const newBorderClasses = borderClasses.map((cls, index) =>
            index < response.data.currentQuestion
              ? "selectedBorder"
              : "noneBorder"
          );
          setBorderClasses(newBorderClasses);
        }
      } catch (error) {
        console.error("Error fetching progress:", error);
      }
    };

    if (currentQuestion >= 2) {
      console.log("Fetch Progress is being called");
      fetchProgress();
    }
  }, [userId]);

  const handleQuestionaireResponse = async (e: any) => {
    e.preventDefault();

    setMessagesIsLoading(false);
    //Ensure that we don't submit anymore
    if (currentQuestion >= 6) {
      setCompleteForm(true);
      setFirstConvoState(false);
    }

    let currentConvoId = sessionStorage.getItem("currentConvoId");
    if (currentConvoId) setCurrentConversationId(currentConversationId);

    if (isClient()) {
      if (!currentConversationId) {
        console.log("No conversation selected.");

        await createConversation(); // Make sure there is a conversation ID
      }

      // 1. Set up the new response without any bot response yet.
      const newResponse = { question: message, response: "" };

      setResponses((responses) => [...responses, newResponse]); // Use functional update for state
      setMessage("");

      try {
        // 2. Fetch bot reply from the API
        const botReply = await fetch(questionBotApi, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            userId,
            message: message,
            conversationId: currentConvoId || currentConversationId,
          }),
        }).then((res) => res.json());

        setMessagesIsLoading(false);

        // 3. Update the responses array with the bot's reply
        setResponses((prevResponses) =>
          prevResponses.map((resp) => {
            if (resp.question === message) {
              return { ...resp, response: botReply.message };
            }
            return resp;
          })
        );

        handleNextQuestion();
        // 4. Send the user question and bot response to the database
        //Add the conversations arrawy or update
      } catch (error) {
        console.error("Error handling submission:", error);
      }
    }
  };

  useEffect(() => {}, [messagesIsLoading]);

  // Update user progress with the extracted vales
  const updateUserProgress = async (
    userId: string,
    birthday: string | null,
    lifePathNumber: number | null,
    zodiacSign: string | null,
    enealogyNumber: string | null,
    religion: string | null
  ) => {
    console.log(
      "Logging The Ennegram before we updateh the user",
      enealogyNumber
    );
    console.log(
      "Logging the lifePathnumber before we update the user",
      lifePathNumber
    );

    try {
      const response = await axios.post("/api/updateUser", {
        userId,
        birthday: birthday ?? undefined,
        lifePathNumber: lifePathNumber ?? undefined,
        zodiacSign: zodiacSign ?? undefined,
        enealogyNumber: enealogyNumber ?? undefined,
        religion: religion ?? undefined,
      });

      console.log(
        "User progress updated successfully After fetch request :",
        response.data
      );
    } catch (error) {
      console.error("Error updating user progress:", error);
    }
  };

  const processResponses = async (responses, userId) => {
    for (const response of responses) {
      const lifePathNumber = extractLifePathNumber(response.response);
      const zodiacSign = extractZodiacSign(response.response);
      const birthday = extractBirthday(response.response || response.question);
      const enealogyNumber = extractEnnealogyNumber(response.response);
      const religion = extractReligion(response.response || response.question);

      const isTextComplete = checkCompletionText(response.response);

      console.log("Logging the Birthday before ISO conversion:", birthday);
      const isoBirthday = birthday ? parseDateString(birthday) : null;
      console.log("Logging the ISO birthday:", isoBirthday);
      let finalEnnealogyNumber
      let finalLifePathNumber
      if (!finalLifePathNumber && isoBirthday) {
        finalLifePathNumber = calculateLifePathNumber(isoBirthday) as number;
        finalEnnealogyNumber = calculateEnnealogyNumber(isoBirthday) as number;


        console.log("Logging the final llife in the if statment", calculateLifePathNumber(isoBirthday) as number)
        console.log("Logging the final enneagmac in the if statment", calculateEnnealogyNumber(isoBirthday) as number)

      }
      console.log("Logging the finalLifePathNumber:", finalLifePathNumber);

      console.log("Logging the finalEnnealogyNumber:", finalEnnealogyNumber);


      console.log("Logging the final out of it llife in the if statment", calculateLifePathNumber(isoBirthday as any) as number)
      console.log("Logging the final enneagmac in the if statment", calculateEnnealogyNumber(isoBirthday as any) as number)
      //Cacluate the probality
      console.log(
        "logging the ENnegarm numner in the front end",
        calculateEnnealogyNumber(isoBirthday as any) as number
      );

      console.log(
        "logging the Lifepath number in the front end",
        calculateLifePathNumber(isoBirthday as any) as number
      );

      console.log(
        "Logging the response before updating progress:",
        response.response
      );

      if (isTextComplete) {
        setCurrentQuestion(6);
        try {
          await axios.post("/api/saveProgress", {
            userId,
            currentQuestion: 6,
            onComplete: true,
          });
        } catch (e) {
          console.error("Error updating progress early:", e);
        }
      }

      if (
        lifePathNumber !== null ||
        zodiacSign !== null ||
        birthday !== null ||
        religion !== null ||
        enealogyNumber !== null
      ) {

        await updateUserProgress(
          userId as any,
          birthday as any,
          finalLifePathNumber as any,
          zodiacSign as any,
          finalEnnealogyNumber as any,
          religion as any
        );
      }
    }
  };
  useEffect(() => {
    if (responses && userId) {
      processResponses(responses, userId);
    }
  }, [responses]);

  //Lets clear the chat Responses when we first load in
  // Function to remove the first index of chatResponses
  const removeFirstChatResponse = () => {
    if (isClient()) {
      const chatResponses = JSON.parse(
        sessionStorage.getItem("chatResponses") || "[]"
      );
      if (chatResponses.length > 0) {
        chatResponses.shift(); // Remove the first element
        sessionStorage.setItem("chatResponses", JSON.stringify(chatResponses));
        console.log("First chat response removed");
      } else {
        console.log("No chat responses to remove");
      }
    }
  };
  useEffect(() => {
    removeFirstChatResponse();
  }, [pathname]);

  const getRandomGreeting = () => {
    return greetings[Math.floor(Math.random() * greetings.length)];
  };

  //Send an automated Message on load
  let automatedMessageCounter = useRef(0);
  const [hasRunSendGreetings, setHasRunSendGreetings] = useState(false);
  const [firstConvoState, setFirstConvoState] = useState<null | boolean>(null);

  const sendAutomatedMessage = async (
    messageContent: string,
    convoId: string,
    userId: string
  ) => {
    if (automatedMessageCounter.current >= 2) {
      return;
    }

    automatedMessageCounter.current += 1;

    // Inline ternary operation to set the message content
    const randomGreeting = getRandomGreeting();

    const userMessage = session?.user?.name
      ? `${randomGreeting}, ${messageContent} ${session.user.name}`
      : `Hello, ${messageContent} ${randomGreeting}`;

    setResponses((prevResponses: any) => [
      ...prevResponses,
      { question: userMessage, response: null },
    ]);

    try {
      // Add a new entry with a loading state before making the API call

      const botReply = await fetch(questionBotApi, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          userId,
          message: userMessage,
          conversationId: convoId,
        }),
      }).then((res) => res.json());

      // Update the response state with the actual response

      setResponses((prevResponses) =>
        prevResponses.map((resp) => {
          if (resp.question === userMessage && resp.response === null) {
            return { ...resp, response: botReply.message };
          }
          return resp;
        })
      );
    } catch (error) {
      console.error("Error sending automated message:", error);
    }
  };

  //Interface for this
  interface ConversationData {
    id: string;
    firstConvo: boolean;
  }

  let fetchFirstConvCounter = useRef(0);

  const fetchFirstConversation = async (
    userId: string
  ): Promise<ConversationData> => {
    fetchFirstConvCounter.current += 1;

    if (currentConversationId === 1) {
      throw new Error("Already initatied conersation");
    }

    if (fetchFirstConvCounter.current >= 2) {
      return Promise.reject("Function has already been called more than once.");
    }

    if (!currentConversationId || !hasRunSendGreetings) {
      try {
        const response = await fetch("/api/firstConversations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch the first conversation");
        }

        const data = await response.json();

        setCurrentConversationId(data.id);
        setFirstConvoState(data.firstConvo);
        return { id: data.id, firstConvo: data.firstConvo };
      } catch (error) {
        console.error("Error fetching the first conversation:", error);
        throw error;
      }
    } else {
      throw new Error("Already initatied conersation");
    }
  };

  // Effect to send a greetings message when the component mounts
  useEffect(() => {
    const userId = session?.user.id;
    console.log(
      "Logging the UserID before we fetch the first conversatino",
      userId
    );

    if (isClient()) {
      if (status === "authenticated" && session) {
        const sendGreetings = async () => {
          const greetingSent = sessionStorage.getItem("greetingSent");
          if (!currentConversationId && session?.user?.id && !greetingSent) {
            setHasRunSendGreetings(true); // Mark the function as having run
            const { id: convoId, firstConvo } = await fetchFirstConversation(
              userId
            ); // Destructure the returned object
            setCurrentConversationId(convoId);
            setFirstConvoState(firstConvo);
            sessionStorage.setItem("currentConvoId", convoId as any);
            sessionStorage.setItem("isFirstConvo", firstConvo as any);
            if (automatedMessageCounter.current < 1 && session?.user?.id) {
              await sendAutomatedMessage("my name is", convoId, userId);
              sessionStorage.setItem("greetingSent", "true");
            } else if (
              automatedMessageCounter.current >= 1 ||
              sessionStorage.getItem("isFirstConvo")
            ) {
              return;
            }
          } else if (greetingSent) {
            return;
          }
        };

        const storedConvoId = sessionStorage.getItem("currentConvoId");
        const fistConvoState = sessionStorage.getItem("isFirstConvo");

        if (
          !completedForm &&
          !fistConvoState &&
          session?.user?.id &&
          !hasRunSendGreetings
        ) {
          sendGreetings();
        } else if (fistConvoState && !completedForm) {
          fetchMessagesForConversation(storedConvoId);
        }
      }
    }
    // Effect to send a greetings message when the component mounts
  }, [status]);

  useEffect(() => {
    const storedConvoId = sessionStorage.getItem("currentConvoId");

    fetchMessagesForConversation(storedConvoId);
  }, []);

  const fetchMessagesForConversation = async (
    conversationId: string | null
  ) => {
    if (!session || !session.user || !session.user.id) {
      console.error("No user session available");
      return;
    }

    setMessagesIsLoading(true);

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

        // Map API response to expected format in state
        let formattedMessages = messages.map((msg: Message) => ({
          question: msg.userContent,
          response: msg.botResponse,
          firstConvo: msg.firstConvo, // Include firstConvo flag in the response
        }));

        // Check if any message has firstConvo set to true and remove the first message if found
        if (formattedMessages.some((msg) => msg.firstConvo)) {
          formattedMessages = formattedMessages.map((msg, index) => {
            if (index === 0) {
              return { ...msg, question: null };
            }
            return msg;
          });
        }

        setResponses([]);

        if (response.ok) {
          setResponses(formattedMessages);
        }
        setMessagesIsLoading(false);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    }
  };

  //Get access to the current conversation Name and Id

  useEffect(() => {}, [conversations]);

  return (
    <>
      {readyToRedirect ? (
        <LoadingComponent />
      ) : (
        <div className="chatDashboard">
          {/* Chat Container Componet  */}

          <div className="tempOverlay h-full flex flex-col pointer-events-none">
            <ChatContainer
              setConversations={setConversations}
              conversations={conversations}
              splitUserName={splitUserName}
              userName={userName || ""}
              email={email || ""}
            />
          </div>

          {/* Chat Container Componet  */}

          <div className="chatDashboardWrapper w-full text-left">
            {/* Guidelines Hader */}

            <header className=" text-[14px] guideLinesContainer gap-[12px] h-[70px] flex !flex-col items-start justify-end w-full px-[22px] mb-[50px] !border-none">
              <div className="flex flex-row w-full justify-between">
                <p className="text-[14px]">seek truth</p>

                <p className="text-[14px]"> {currentQuestion}/6 Completed</p>
              </div>

              <div className="flex-row flex gap-[30px] w-full">
                {borderClasses.map((borderClass, index) => (
                  <div key={index} className={`box ${borderClass}`}></div>
                ))}
              </div>
            </header>

            <div className="chatDashBoardContainer">
              {/* Dashboard Component  */}

              <SignupForm
                userName={userName || ""}
                completedForm={completedForm}
                sessionStatus={sessionStatus}
                sendAutomatedMessage={sendAutomatedMessage}
                fetchFirstConversation={fetchFirstConversation}
              />
            </div>

            <Link
              href="/chat/app"
              className={`${styles.popupBtn} absolute bottom-[50px] left-1/2 transform -translate-x-1/2 mb-4`}
              style={{ display: currentQuestion >= 6 ? "flex" : "none" }}
            >
              Enter The Temple
            </Link>

            <form
              ref={formRef}
              onSubmit={handleQuestionaireResponse}
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
          </div>
        </div>
      )}
    </>
  );
};
function Header() {
  return (
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
  );
}
export default dynamic(() => Promise.resolve(ChatDashboard), { ssr: false });
