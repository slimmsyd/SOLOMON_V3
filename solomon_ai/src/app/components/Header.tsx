import { useEffect, useRef, useState } from "react";
import MobileChatBTNComponent from "./helper/mobileChatBtn";




interface HeaderProps {
  handleMobileChatBtnClick: () => void;
  showGuidelines?: boolean;
  setShowGuidelines: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header: React.FC<HeaderProps> = ({
  handleMobileChatBtnClick,
  showGuidelines,
  setShowGuidelines,
}) => {
  const [activeIndex, setActiveIndex] = useState<boolean>(false);

  const toggleGuidelines = () => {
    console.log("Guidlines is Being logged right now ", showGuidelines)
    setShowGuidelines(!showGuidelines);
  };

  return (
    <header className=" text-[14px] guideLinesContainer gap-[8px] h-[70px] flex flex-row items-center justify-end w-full px-[22px] mb-[50px]">
      <MobileChatBTNComponent 
      handleMobileChatBtnClick = {handleMobileChatBtnClick}
      
      />
      <div className="flex flex-row gap-[18px] items-center justify-center">
        <button
          onClick={toggleGuidelines}
          className="flex flex-row guideLinesBtn gap-[10px] hover:bg-[#4B4B4B]"
        >
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
    </header>
  );
};
