import React, { FC, useState, useEffect, useRef } from "react";

interface Props {
  setShowAvatarSettings: React.Dispatch<React.SetStateAction<boolean>>;
  showAvatarSettings: boolean;
  changeProfileImage: (string) => void;
  setAvatarImage: React.Dispatch<React.SetStateAction<string>>;
}

const UserAvatar: FC<Props> = ({
  setShowAvatarSettings,
  showAvatarSettings,
  changeProfileImage,
  setAvatarImage,
}) => {
  //Change the profile Image based on cllick
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentAvatar, setAvatar] = useState([
    "/assets/Chat/Solomon1.png",
    "/assets/Chat/Solomon2.png",
    "/assets/Chat/Solomon3.png",
    "/assets/Chat/Solomon4.png",
    "/assets/Chat/Solomon5.png",
    "/assets/Chat/Solomon6.png",
  ]);

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === currentAvatar.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleBackClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? currentAvatar.length - 1 : prevIndex - 1
    );
  };

  //Update the current avatar aswell

  useEffect(() => {
    setAvatarImage(currentAvatar[currentIndex]);
  }, [currentAvatar]);

  return (
    <div className="absolute flex flex-wrap flex-row gap-[10px] items-center justify-center avatarDiv w-[100%]">
      <div className=" avatarSettings !bg-[#121212] gap-[20px] !h-[540px]  p-[2rem] flex flex-col md:flex-col justify-between items-center">
        <h1>Current Avatar</h1>

        <div className="flex flex-row gap-[25px] flex-1 items-center">
          <span
            onClick={handleBackClick}
            className="w-[20px] h-[20px] relative cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 32 32"
              className="rotate-[-90deg]"
            >
              <path
                fill="currentColor"
                fill-rule="evenodd"
                d="M15.192 8.906a1.143 1.143 0 0 1 1.616 0l5.143 5.143a1.143 1.143 0 0 1-1.616 1.616l-3.192-3.192v9.813a1.143 1.143 0 0 1-2.286 0v-9.813l-3.192 3.192a1.143 1.143 0 1 1-1.616-1.616z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </span>
          <div
            onClick={() => changeProfileImage(currentAvatar[currentIndex])}
            className="mt-2 cursor-pointer w-[220px] h-[100%] relative z-1 "
          >
            <img
              src={currentAvatar[currentIndex]}
              alt="Connect wallet button"
              className="absolute h-[100%] w-[100%] avatarImage"
            />
          </div>{" "}
          <span
            onClick={handleNextClick}
            className="w-[20px] h-[20px] relative cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
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
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserAvatar;
