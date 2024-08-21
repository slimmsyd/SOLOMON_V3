import { useEffect, useState, useRef } from "react";

interface Props {
  chatContainerToggle?: () => void;
  chatContainerShown?: boolean;
}

export default function OpenChatContainer({ chatContainerToggle, chatContainerShown }: Props) {


    useEffect(() => { 
        
        
    },[chatContainerShown])


  return (
    <div className={`fixed left-5 top-5 closeContainerBtn ${chatContainerShown ? "show" : ""}`}>
      <button 
        onClick={chatContainerToggle}
      className="textAreaIcon rotate-[270deg]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="none"
          viewBox="0 0 32 32"
          className=""
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
  );
}
