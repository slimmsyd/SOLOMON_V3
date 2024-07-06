interface HeaderProps {
    handleMobileChatBtnClick: () => void;
  }
  
  export const Header: React.FC<HeaderProps> = ({ handleMobileChatBtnClick }) => {
    return (
      <header className=" text-[14px] guideLinesContainer gap-[8px] h-[70px] flex flex-row items-center justify-end w-full px-[22px] mb-[50px]">
        <div className=" flex-1   cursor-pointer mobileChatContainer">
          <div
            onClick={handleMobileChatBtnClick}
            className=" mobileChatBtn flex items-center justify-start"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M112,60a16,16,0,1,1,16,16A16,16,0,0,1,112,60Zm16,52a16,16,0,1,0,16,16A16,16,0,0,0,128,112Zm0,68a16,16,0,1,0,16,16A16,16,0,0,0,128,180Z"></path>
            </svg>
          </div>
        </div>
        <div className="flex flex-row gap-[18px] items-center justify-center">
          <button className="hover:text-[#807f7f]">Tour</button>
  
          <button className="flex flex-row guideLinesBtn gap-[10px] hover:bg-[#4B4B4B]">
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