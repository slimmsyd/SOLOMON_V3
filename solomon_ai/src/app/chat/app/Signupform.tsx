import { Session } from "inspector";
import { useEffect, useRef, useState } from "react";
import React, { FC, RefObject } from "react";
import { ChatMessagesContainer } from "./ChatMessage";
import { useChatConversation } from "@/app/hooks/ConversationContext";
import useConversations from "@/app/hooks/useConversations";
import { useSession, getSession } from "next-auth/react";
import useCreateConversation from "@/app/hooks/createConversation";
import { SignUpMessageContainer } from "./components/SignUpMessageContainer";
import { db } from "@/app/api/lib/db";
import { Message } from "../../../../types";
interface SignupFormProps {
  userName: string;
  completedForm: boolean;
  sessionStatus: string;
  sendAutomatedMessage: (message: string, convoId: number) => void;
  fetchFirstConversation: (userId: number) => void;
}

export const SignupForm: FC<SignupFormProps> = ({
  userName,
  completedForm,
  sessionStatus,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const { data: session, status } = useSession();

  const formRef = useRef<HTMLFormElement>(null);
  const [currentConversationId, setCurrentConversationId] = useState<
    number | null
  >(null);

  const [firstConversation, setFirstConversation] = useState<boolean | null>(
    null
  );

  const {
    responses,
    setResponses,
    message,
    setMessage,
    isFetchLoading,
    setIsFetchLoading,
  } = useChatConversation();
  const { conversations, isLoading, setConversations } =
    useConversations(session);

  const {
    createConversation,
    newTitle,
    setNewTitle,
    isCreateLoading,
    error,
    dataId,
  } = useCreateConversation(
    session as any,
    setConversations as any,
    setCurrentConversationId
  );

  //Stores the Chat

  //Send an automated Message on load
//   let automatedMessageCounter = useRef(0);
  const [firstMessage, setFirstMessage] = useState<number>(0);

//   const sendAutomatedMessage = async (messageContent, convoId: number) => {
//     automatedMessageCounter.current += 1;

//     console.log(
//       `sendAutomatedMessage has been called ${automatedMessageCounter.current} times`
//     );

//     if(automatedMessageCounter.current >=2) { 
//         return
//     }

//     try {
//       const botReply = await fetch("http://localhost:3001/", {
//         method: "POST",
//         headers: {
//           "Content-type": "application/json",
//         },
//         body: JSON.stringify({ message: messageContent }),
//       }).then((res) => res.json());

//       setResponses((prevResponses) => [
//         ...prevResponses,
//         { question: "", response: botReply.message },
//       ]);

//       setResponses((prevResponses) =>
//         prevResponses.map((resp) => {
//           if (resp.question === message) {
//             return { ...resp, response: botReply.message };
//           }
//           return resp;
//         })
//       );

//       console.log("Logging the responses in automated message", responses);

//       await fetch("/api/messages", {
//         method: "POST",
//         headers: {
//           "Content-type": "application/json",
//         },
//         body: JSON.stringify({
//           userId: session?.user.id,
//           conversationId: convoId,
//           userContent: messageContent,
//           botResponse: botReply.message,
//         }),
//       });
//     } catch (error) {
//       console.error("Error sending automated message:", error);
//     }
//   };

//   const fetchFirstConversation = async (userId: number): Promise<number> => {
//     console.log("Logging FetchFirstConvo USER ID", userId);

//     try {
//       const response = await fetch("/api/firstConversations", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ userId }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch the first conversation");
//       }

//       const data = await response.json();

//       console.log("Logging the data on the first conversation on load", data);
//       setCurrentConversationId(data.id);
//       return data.id; // Return the conversation ID
//     } catch (error) {
//       console.error("Error fetching the first conversation:", error);
//       throw error;
//     }
//   };

//   useEffect(() => {
//     if (session?.user?.id) {
//       const userId = session.user.id;
//       console.log("logging the userID to be noew ", userId);
//       fetchFirstConversation(userId).catch(console.error);
//     }
//   }, [session]);

//   // Effect to send a greetings message when the component mounts
//   useEffect(() => {
//     const userId = session?.user.id;

//     // Effect to send a greetings message when the component mounts
//     const sendGreetings = async () => {
//       console.log("Logging the Conversation ID", currentConversationId);
//       if (!currentConversationId && session?.user?.id) {
//         const convoId = await fetchFirstConversation(userId);
//         console.log("loggign the convo Id in the send Greets", convoId);
//         setCurrentConversationId(convoId);
//         console.log("Did we create a new convo?", currentConversationId);
//       }

//       if (automatedMessageCounter.current < 1 && session?.user?.id) {
//         const convoId = await fetchFirstConversation(userId);
//         console.log(
//           "Calling hte current before we sent the automated message",
//           automatedMessageCounter.current
//         );
//         await sendAutomatedMessage("Hello, Solomon I am here", convoId);
//       } else if (automatedMessageCounter.current >= 2) {
//         return;
//       }
//     };

//     if (!completedForm && currentConversationId === null) {
//       sendGreetings();
//     }

//     console.log(
//       "Logging the current AutomatedMessage",
//       automatedMessageCounter.current
//     );
//   }, [session]);



  //We have ot check if this is the first conversation
  // Example function to get or create the first conversation for a user

  useEffect(() => {
  }, [firstMessage]);

  //Submit the Inquiry

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
      console.log("Dragging");
      setStartX(e.pageX - wrapper.offsetLeft);
      setScrollLeft(wrapper.scrollLeft);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - wrapper.offsetLeft;
      const walk = (x - startX) * 2; // Adjust the scroll speed
      wrapper.scrollLeft = scrollLeft - walk;

      console.log("loggin walk", walk);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    wrapper.addEventListener("mousedown", handleMouseDown);
    wrapper.addEventListener("mousemove", handleMouseMove);
    wrapper.addEventListener("mouseup", handleMouseUp);
    wrapper.addEventListener("mouseleave", handleMouseUp);

    return () => {
      wrapper.removeEventListener("mousedown", handleMouseDown);
      wrapper.removeEventListener("mousemove", handleMouseMove);
      wrapper.removeEventListener("mouseup", handleMouseUp);
      wrapper.removeEventListener("mouseleave", handleMouseUp);
    };
  }, [isDragging, startX, scrollLeft]);



  return (
    <>
      {/* Guidelines Hader */}

      {/* Dashboard Component  */}

      <SignUpMessageContainer
        responses={responses || "null"}
        firstMessage={firstMessage}
      />

      {/* <form ref={formRef} onSubmit={handleSubmit} className="chatFormSubmit">
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
        </form> */}
    </>
  );
};
