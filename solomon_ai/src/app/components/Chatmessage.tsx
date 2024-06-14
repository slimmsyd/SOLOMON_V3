import { useState, useEffect } from "react";
import styles from '../../styles/chat.module.css'

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

interface ChatMessageProps {
  message: string;
  shouldAnimate?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, shouldAnimate = true }) => {
  const [displayedMessage, setDisplayedMessage] = useState<string>(shouldAnimate ? "" : formatResponse(message));
  const [isTyping, setIsTyping] = useState<boolean>(shouldAnimate);

  useEffect(() => {
    if (isTyping && displayedMessage.length < message.length) {
      const timer = setTimeout(() => {
        setDisplayedMessage(message.slice(0, displayedMessage.length + 1));
      }, 15); // Adjust typing speed as necessary
      return () => clearTimeout(timer);
    } else if (isTyping) {
      setIsTyping(false);
    }
  }, [isTyping, displayedMessage, message]);

  useEffect(() => {
    if (isTyping) {
      setDisplayedMessage('');
      setIsTyping(true);
    } else {
      setDisplayedMessage(formatResponse(message));
    }
  }, [isTyping, message]);

  const formattedMessage = formatResponse(displayedMessage);

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