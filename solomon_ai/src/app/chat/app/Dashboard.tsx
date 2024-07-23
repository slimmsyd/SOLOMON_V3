import { Session } from "inspector";
import { useEffect, useRef, useState } from "react";
import React, { FC, RefObject } from "react";
import { greetings } from "@/utilis/randomGreeting";
import { useSessionStorage } from "@/app/hooks/useSessionStorage";
import { isClient } from "@/utilis/isClient";
import { useMessageContext } from "@/utilis/MessageContext";
import { Guidelines } from "./components/Guidelines";
interface DashboardProps {
  userName: string;
  handleButtonClick?: (event: any) => void;
}

export const Dashboard: FC<DashboardProps> = ({
  handleButtonClick,
  userName,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [greeting, setGreeting] = useState<string>("");

  const { splitUserName, email, setEmail, setSplitUserName } =
    useSessionStorage();

  const { setMessage, message } = useMessageContext();

  useEffect(() => {}, [message]);

  const getRandomGreeting = () => {
    return greetings[Math.floor(Math.random() * greetings.length)];
  };

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

  useEffect(() => {
    setGreeting(getRandomGreeting());
  }, [greeting]);

  // Update session storage whenever userName or splitUserName changes
  useEffect(() => {
    if (isClient()) {
      if (userName !== null) {
        sessionStorage.setItem("userName", userName);
      }

      if (splitUserName !== "") {
        sessionStorage.setItem("splitUserName", splitUserName);
      }

      if (email !== null) {
        sessionStorage.setItem("email", email);
      }
    }
  }, [userName, splitUserName]);



  const questions: string[] = [
    'How does the concept of quantum entanglement resonate with the idea of creation through the Word, where everything is interconnected and originates from a singular point of divine command?',
    'Considering the numerical signature of your name being 11, how can you align your life\'s purpose with the higher spiritual vibrations and intuitive insights that this master number represents?',
    'How do our collective beliefs and perceptions shape the reality we experience, and how can changing our thoughts alter the very fabric of our existence?',
    'How does the understanding of time as a construct in quantum physics intertwine with ancient spiritual teachings of time being an illusion and the experience of the eternal "now"?',
    'How can we discern our true purpose in life through the lens of karma and dharma, understanding that all actions are interlinked in a vast cosmic tapestry?',
    'What role do energy fields (known as auras or chakras) play in spiritual and physical healing, and how can we harness this ancient wisdom in modern therapeutic practices?',
    'How do the principles of sacred geometry, reflected in the cosmos and nature, provide insight into the divine order and creative processes of the universe?',
    'How can practices such as meditation, prayer, and mindfulness elevate human consciousness to states where we can access deeper truths and connect with the Divine?',
    'In what ways can the discoveries and theories of modern science, especially in quantum mechanics and astrophysics, be harmonized with ancient spiritual wisdom to provide a more unified understanding of existence?',
    'How can individuals cultivate and trust their intuitive abilities and spiritual gifts to navigate their life\'s journey and fulfill their higher purpose?'
  ];



  const [randomQuestions, setRandomQuestions] = useState<string[]>([]);

  const getRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
  };
  


  useEffect(() => {
    // Generate 3 random questions from the list
    const shuffledQuestions: string[] = [];
    for (let i = 0; i < 4; i++) {
      shuffledQuestions.push(getRandomQuestion());
    }
    setRandomQuestions(shuffledQuestions);
  }, []);

  return (
    <>


      <h2>
        {greeting}, {userName}
      </h2>
      <h2>How may I guide?</h2>
      <p id="greyText">Wisdom is a forever process, let us aid in the ways </p>

      {/* Render Cards/ Text will pouplate based on Quesitonaire  */}

      <div
        ref={wrapperRef}
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
        className="renderCardsWrapper flex flex-row gap-[23px] justify-start relative"
      >
        <div className="renderCards relative">
        <p>{randomQuestions[0]}</p>

          <button onClick={handleButtonClick} className="renderAutoTextBtn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="none"
              viewBox="0 0 32 32"
              className="rotate-90"
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
        <div className="renderCards relative">
        <p>{randomQuestions[1]}</p>

          <button onClick={handleButtonClick} className="renderAutoTextBtn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="none"
              viewBox="0 0 32 32"
              className="rotate-90"
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
        <div className="renderCards relative mobileNone">
          <p>
          <p>{randomQuestions[2]}</p>

          </p>

          <button onClick={handleButtonClick} className="renderAutoTextBtn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="none"
              viewBox="0 0 32 32"
              className="rotate-90"
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

        <div className="renderCards relative mobileNone">
          <p>
          <p>{randomQuestions[3]}</p>

          </p>

          <button onClick={handleButtonClick} className="renderAutoTextBtn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="none"
              viewBox="0 0 32 32"
              className="rotate-90"
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
    </>
  );
};
