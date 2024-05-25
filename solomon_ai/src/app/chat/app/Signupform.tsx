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
  sendAutomatedMessage: (message: string, convoId: string, userId: string) => void;
  fetchFirstConversation: (userId: string) => void;
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
    number | string| null
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
