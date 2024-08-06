import { useEffect, useState, useRef } from 'react';

interface FloatingScrollButtonProps {
  chatDashBoardRef: React.RefObject<HTMLDivElement>;
}

const FloatingScrollButton: React.FC<FloatingScrollButtonProps> = ({ chatDashBoardRef }) => {
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  const scrollByPixels = (pixels: number) => {
    if (chatDashBoardRef.current) {
      chatDashBoardRef.current.scrollBy({ top: pixels, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    if (chatDashBoardRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatDashBoardRef.current;
      const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
      setIsButtonVisible(distanceFromBottom > 500);
    }
  };

  useEffect(() => {
    const chatContainer = chatDashBoardRef.current;
    if (chatContainer) {
      chatContainer.addEventListener('scroll', handleScroll);
      // Initial check
      handleScroll();
    }
    return () => {
      if (chatContainer) {
        chatContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [chatDashBoardRef]);

  if (!isButtonVisible) return null;

  return (
    <div className="floatingDiv cursor-pointer z-10 rounded-full bg-clip-padding text-token-text-secondary border-token-border-light right-1/2 translate-x-1/2 bg-token-main-surface-primary bottom-5">
      <button onClick={() => scrollByPixels(50000)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M12 21a1 1 0 0 1-.707-.293l-7-7a1 1 0 1 1 1.414-1.414L11 17.586V4a1 1 0 1 1 2 0v13.586l5.293-5.293a1 1 0 0 1 1.414 1.414l-7 7A1 1 0 0 1 12 21"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default FloatingScrollButton;
