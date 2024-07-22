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
          <p>Get your astrological predictions</p>

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
          <p>Calculate my life path number, and personal months meaning</p>

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
            Based on the meaning of my name and its numerical signature, what
            can you say for guidance on how the universe designed me
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
            Breakdown “In the beginning was the world” from a Quantum
            perspective
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
