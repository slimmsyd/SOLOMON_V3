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


  return (
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
  );
};
