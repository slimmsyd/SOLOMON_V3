import { useState, useEffect } from "react";
import styles from '../../styles/chat.module.css'

function ChatMessage({ message, shouldAnimate = true }) {
    const [displayedMessage, setDisplayedMessage] = useState(shouldAnimate ? "" : message);
    const [typing, setTyping] = useState(shouldAnimate);

    useEffect(() => {
        if (typing && displayedMessage.length < message.length) {
            const timer = setTimeout(() => {
                setDisplayedMessage(message.slice(0, displayedMessage.length + 1));
            }, 30); // Adjust typing speed as necessary
            return () => clearTimeout(timer);
        } else if (typing) {
            setTyping(false);
        }
    }, [displayedMessage, message, typing]);

    return (
        <>
            {displayedMessage}
            {typing && <span className={styles.cursor}>|</span>} {/* Simple cursor simulation */}
        </>
    );
}
export default ChatMessage;
