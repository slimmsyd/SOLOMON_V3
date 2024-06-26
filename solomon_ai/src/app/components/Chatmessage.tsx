import { useState, useEffect } from "react";
import styles from '../../styles/chat.module.css'
import { debug } from "console";
import { string } from "zod";

export const formatResponse = (response: string): string => {
  // Replace **text** with <strong>text</strong>
  let formattedResponse = response.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  
  // Handle numbered list items and paragraphs
  const listItems = formattedResponse.match(/(\d+\..*?)(?=(\d+\.)|$)/gs);
  if (listItems) {
    const listFormatted = listItems.map(item => `<li>${item.trim()}</li>`).join('<br />');
    formattedResponse = formattedResponse.replace(listItems.join(''), `<ul>${listFormatted}</ul>`);
  }

  // Split the response into paragraphs
  const paragraphs = formattedResponse.split('\n').filter(paragraph => paragraph.trim() !== '');

  // Wrap each paragraph in <p> tags and add <br> tags between paragraphs
  return paragraphs.map(paragraph => `<p className="user_Messages">${paragraph.trim()}</p>`).join('<br>');
};



interface ResponseObject { 
  question: string;
  response: string;
  id: string;
}

interface ChatMessageProps {
  response: ResponseObject;
  shouldAnimate?: boolean;
}



const ChatMessage: React.FC<ChatMessageProps> = ({ response, shouldAnimate = true }) => {





  // console.log("Logging the responses in the main messaeg", response)
  // console.log("Logging the respsoneObejct In main", responseObject)



  const [displayedMessage, setDisplayedMessage] = useState<string>(shouldAnimate ? "" : formatResponse(response.response))

  const [isTyping, setIsTyping] = useState<boolean>(shouldAnimate);
  const [lastMessageId, setLastMessageId] = useState<string | null>(null);





  useEffect(() => {
    if (shouldAnimate) {
      setIsTyping(true);
      setDisplayedMessage('');
    } else {
      setIsTyping(false);
      setDisplayedMessage(response.response);
    }
  }, [response, shouldAnimate]);

  useEffect(() => {
    if (isTyping && displayedMessage.length < response.response.length) {
      const timer = setTimeout(() => {
        setDisplayedMessage(response.response.slice(0, displayedMessage.length + 1));
      }, 15);
      return () => clearTimeout(timer);
    } else if (isTyping) {
      setIsTyping(false);
    }
  }, [isTyping, displayedMessage, response]);

  // useEffect(() => {
  //   if (isTyping) {
  //     setDisplayedMessage('');
  //     setIsTyping(true);
  //   } else {
  //     setDisplayedMessage(response.response);
  //   }
  // }, [isTyping, response]);

  const formattedMessage = formatResponse(displayedMessage)

  const plainTextMessage = isTyping ? formattedMessage : formattedMessage;


  return (
    <div>
      <div
        dangerouslySetInnerHTML={{ __html: plainTextMessage }}
        className={styles.user_Messages}
      />
    </div>
  );
};

export default ChatMessage;