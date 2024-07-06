import React, { useEffect, useState, FC, FormEvent, useRef } from "react";
import Image from "next/image";
import VirgoImage from "../../../../public/assets/zodiacIcons/virgopng.png";
import arrowLeft from "../../../../public/assets/Chat/arrowLeft.png";
import { useChatConversation } from "@/app/hooks/ConversationContext";
import { isClient } from "@/utilis/isClient";
import useCreateConversation from "@/app/hooks/createConversation";
import useConversations from "@/app/hooks/useConversations";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { v4 as uuidv4 } from "uuid";
// Import the module
// import Ephemeris from "https://esm.sh/gh/0xStarcat/Moshier-Ephemeris-JS/src/Ephemeris.js";


interface Horoscope {
  zodiacSign: string;
  period: string;
}

export const TodaysContainer: FC<Horoscope> = ({ zodiacSign, period }) => {
  const [horoscope, setHoroscope] = useState(null);
  const [error, setError] = useState<boolean>(false);

  const [currentConversationId, setCurrentConversationId] = useState<
    number | string | null
  >(null);

  const { data: session, status } = useSession();

  const [messagesIsLoading, setMessagesIsLoading] = useState<null | boolean>(
    null
  );

  const [userId, setUserId] = useState<string>("");
  const chatBotUrl =
    "https://biewq9aeo5.execute-api.us-east-1.amazonaws.com/dev/solomonAPI";

  const { conversations, isLoading, setConversations } = useConversations(
    session as Session
  );
  //Stores the Chat
  const {
    responses,
    setResponses,
    message,
    setMessage,
    isFetchLoading,
    setIsFetchLoading,
  } = useChatConversation();

  const { createConversation, newTitle, setNewTitle, isCreateLoading, dataId } =
    useCreateConversation(
      session as Session,
      setConversations as any,
      setCurrentConversationId
    );

  //We are going to clear the conversationID
  useEffect(() => {
    console.log("clearing the current conversation ID");
    setResponses([]);
    setCurrentConversationId(null);
  }, []);

  const sendAutomatedMessage = async (
    messageContent: string,
    userId: string
  ) => {
    if (automatedMessageCounter.current >= 2) return;

    automatedMessageCounter.current += 1;
    let currentConvoId = sessionStorage.getItem("currentConvoId");
    if (currentConvoId) setCurrentConversationId(currentConversationId);

    const userMessage = messageContent;

    setResponses((prevResponses: any) => [
      ...prevResponses,
      { question: userMessage, response: null },
    ]);

    try {
      const botReply = await fetch("api/zodiacBot", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ userId, message: userMessage }),
      }).then((res) => res.json());

      setResponses((prevResponses) =>
        prevResponses.map((resp) => {
          if (resp.question === userMessage && resp.response === null) {
            return { ...resp, response: botReply.message };
          }
          return resp;
        })
      );

      // Store response in localStorage with today's date
      const currentDate = new Date().toISOString().split("T")[0];
      localStorage.setItem(
        `horoscope-${currentDate}`,
        JSON.stringify(botReply.message)
      );

      console.log(
        "Logging the Bot Reply Messsage, after the change of function code",
        botReply.message
      );
    } catch (error) {
      console.error("Error sending automated message:", error);
    }
  };

  //Send data for toadys horoscope get response, save response and populate that as the consistent daily horoscope
  let automatedMessageCounter = useRef(0);
  const [hasRunSendGreetings, setHasRunSendGreetings] = useState(false);
  const [firstConvoState, setFirstConvoState] = useState<null | boolean>(null);

  // Clear conversation ID and responses on component mount
  useEffect(() => {
    setResponses([]);
    setCurrentConversationId(null);
  }, []);

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    const storedHoroscope = localStorage.getItem(`horoscope-${currentDate}`);

    console.log("Loggign the stored Horoscope", storedHoroscope);

    if (storedHoroscope) {
      console.log("THere isn't a stored horoscope", storedHoroscope);
      setHoroscope(JSON.parse(storedHoroscope));
    } else {
      const sendGreetings = async () => {
        if (!currentConversationId && session?.user?.id) {
          setHasRunSendGreetings(true);


          if (automatedMessageCounter.current < 1 && session?.user?.id && zodiacSign) {
            await sendAutomatedMessage(
              `Peace unto you Solomon, tell me the daily Horoscope for ${zodiacSign} today's date is ${currentDate}, please just return your best approximate prediction for the horoscope on this day. Return the Date that I sent to ensure that I the user and You the sage are in a coherent clear communication channel. Only give me the horoscope for the zodiac sign that I provided. Provided me what my moon is in aswell.`,
              userId
            );
          } else if (
            automatedMessageCounter.current >= 1 ||
            sessionStorage.getItem("isFirstConvo")
          ) {
            return;
          }
        }
      };

      sendGreetings();




    }



  }, [zodiacSign, session?.user?.id, currentConversationId, userId]);







  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];

    const storedHoroscope = localStorage.getItem(`horoscope-${currentDate}`);

    console.log("Logging the stored horoscope in the useEffect", storedHoroscope)
    if(storedHoroscope){
      setHoroscope(storedHoroscope as any)
    }

  }, [horoscope]);


  
  return (
    <div className="flex md:flex-row flex-col gap-[15px] rounded-[10px] md:gap-[0px border-[0.5px] border-[#737373] justify-between accountDiv">
      <div className="flex flex-col gap-[15px]">
        <div className="zodiacWrapper">
          <Image
            width={32}
            height={32}
            src={VirgoImage}
            alt="Virgo Zodiac Sign"
          />
        </div>
        <p className="text-white">Sun Sign: {zodiacSign}</p>
        <p className="text-[14px] text-white">{horoscope}</p>
      </div>
    </div>
  );
};
