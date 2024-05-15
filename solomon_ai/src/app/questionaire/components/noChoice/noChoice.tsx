import { use, useEffect, useRef, useState } from "react";
import React, { FC, RefObject } from "react";

interface ChoiceTwoProps {
  toggleDropDownDiv: () => void;
  selectedOption: string;
  handleOptionClick: (option: string) => void;
  removeOptionClick: (option: string) => void;
  handleBackClick: () => void;
  setSelectedOption: (option: string) => void;
  userPreferences: string[]; // Type for user preferences
  setUserPreferences: (preferences: string[]) => void; // Type the setter function
  addUserPreference: () => void; // Add the new function to the props interface

}

export const ChoiceNone: FC<ChoiceTwoProps> = ({
  toggleDropDownDiv,
  selectedOption,
  handleOptionClick,
  removeOptionClick,
  handleBackClick,
  setSelectedOption,
  userPreferences,
  setUserPreferences,
  addUserPreference
}) => {

    const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    console.log(
      "logging the selected funciton while is chaning",
      selectedOption
    );

  }, [selectedOption]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSelectedOption(e.target.value);
  };



  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (textareaRef.current && !textareaRef.current.contains(event.target as Node)) {
        addUserPreference();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [addUserPreference]);



  

  return (
    <div className="p-8 pb-0 w-full relative">
      <div
        onClick={handleBackClick}
        className="flex flex-row gap-3 mb-8 cursor-pointer items-center"
      >
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
            width="18"
            height="18"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M9.70711 16.7071c-.39053.3905-1.02369.3905-1.41422 0l-6-6c-.39052-.3905-.39052-1.02368 0-1.41421l6-6c.39053-.39052 1.02369-.39052 1.41422 0 .39049.39053.39049 1.02369 0 1.41422L5.41421 9H17c.5523 0 1 .44772 1 1 0 .5523-.4477 1-1 1H5.41421l4.2929 4.2929c.39049.3905.39049 1.0237 0 1.4142Z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </span>
        <p>Back</p>
      </div>

      <h4>What do you seek out this app?</h4>

      <textarea
      ref = {textareaRef}
        onClick={toggleDropDownDiv}
        className=" dropDownSelection my-8  w-full !h-[150px] p-2  secondary-font bg-transparent border border-[rgba(0,0,0,.5)] rounded-lg outline-none text-white  relative z-10 resize-none"
        value={selectedOption}
        onChange={handleTextChange} // Use the handleTextChange function
      >
        {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="#505050"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              className="inputIcon"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="m21 21-6-6m2-5c0 3.866-3.134 7-7 7-3.86599 0-7-3.134-7-7 0-3.86599 3.13401-7 7-7 3.866 0 7 3.13401 7 7Z"
              ></path>
            </svg>
            {selectedOption}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
              width="24"
              height="24"
              className="inputIcon iconEnd"
              aria-hidden="true"
              onClick={() => removeOptionClick("")}
            >
              <path
                fill-rule="evenodd"
                d="M10 18c4.4183 0 8-3.5817 8-8 0-4.41828-3.5817-8-8-8-4.41828 0-8 3.58172-8 8 0 4.4183 3.58172 8 8 8ZM8.70711 7.29289c-.39053-.39052-1.02369-.39052-1.41422 0-.39052.39053-.39052 1.02369 0 1.41422L8.58579 10l-1.2929 1.2929c-.39052.3905-.39052 1.0237 0 1.4142.39053.3905 1.02369.3905 1.41422 0L10 11.4142l1.2929 1.2929c.3905.3905 1.0237.3905 1.4142 0 .3905-.3905.3905-1.0237 0-1.4142L11.4142 10l1.2929-1.29289c.3905-.39053.3905-1.02369 0-1.41422-.3905-.39052-1.0237-.39052-1.4142 0L10 8.58579l-1.29289-1.2929Z"
                clip-rule="evenodd"
              ></path>
            </svg> */}
      </textarea>
    </div>
  );
};
