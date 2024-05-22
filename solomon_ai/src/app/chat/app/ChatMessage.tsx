import styles from "../../../styles/chat.module.css";
import { useEffect, useRef, useState } from "react";
import React, { FC, RefObject } from "react";
import ChatMessage from "@/app/components/Chatmessage";
import LoadingComponent from "@/app/components/helper/Loading";

interface ChatMessage {
  question: string;
  response: string;
}

interface ChatMessageProps {
  responses: ChatMessage[];
}

export const ChatMessagesContainer: FC<ChatMessageProps> = ({ responses }) => {
  const [splitUserName, setSplitUserName] = useState<string>("");
    //Get the split user name 
    useEffect(() => { 
      const storedSplitUserName = sessionStorage.getItem("splitUserName");

      setSplitUserName(storedSplitUserName || '');
      
    },[])

    //We want to get the latest storage when we swith the platform 

    


  return (

<>

    {/* <header className=" text-[14px] guideLinesContainer gap-[8px] h-[70px] flex flex-row items-center justify-end w-full px-[22px] mb-[50px]">
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
  </header> */}
    <div className={styles.chat_container}>
      <div className={styles.chat_box}>
        <div className={styles.chat_flex}>
          <div className={styles.chat_Messages}>
            {responses.map((response, index) => (
              <div className={styles.response_Flex} key={index}>
                {/* <div className="mainIcon flex items-center justify-center iconBorder">
                {splitUserName}
              </div> */}
                  <p
                  data-split-username={splitUserName}
                    className={`${styles.bot_Messages} ${styles.new_bot_message}`}
                  >
                    {response.question}
                  </p>

                {response.response ? (
                  <p className={styles.user_Messages}>
                    <ChatMessage message={response.response} />
                  </p>
                ) : (
                  <LoadingComponent />
                  // isFetchLoading && <LoadingComponent /> // Render LoadingComponent while waiting for response
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

</>

  );
};
