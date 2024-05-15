"use client";
import { useState, useRef, useEffect, FC } from "react";
import NavComponent from "../navigation/navComponent";
import { ChoiceOne } from "./components/ChoiceOne";
import { ChoiceTwoReligion } from "./components/religionChoice/ChoiceTwoReligion";
import { ChoiceThreeReligion } from "./components/religionChoice/ChoiceThreeReligion";
import { ChoiceIslam } from "./components/religionChoice/ChoiceIslam";
import { ChoiceOneSpiritual } from "./components/spirutalChoice/ChoiceOneSpiritual";
import { ChoiceNone } from "./components/noChoice/noChoice";

const Questionaire: FC = () => {
  const dropDownDiv = useRef<HTMLDivElement>(null);

  //Dynamically update the text based on what the user clicks on
  const [selectedOption, setSelectedOption] = useState("");
  const [userPreferences, setUserPreferences] = useState<string[]>([]);

  const [currentIndex, setCurrentIndex] = useState(0);

  function toggleDropDownDiv() {
    if (dropDownDiv.current) {
      let dropdownDivCurrent = dropDownDiv.current;
      if (dropdownDivCurrent.style.opacity === "1") {
        dropdownDivCurrent.style.top = "45%";
        dropdownDivCurrent.style.opacity = "0";
        dropdownDivCurrent.style.pointerEvents = "none";
        dropdownDivCurrent.style.zIndex = "1";
      } else {
        dropdownDivCurrent.style.top = "83%";
        dropdownDivCurrent.style.opacity = "1";
        dropdownDivCurrent.style.pointerEvents = "all";
        dropdownDivCurrent.style.zIndex = "11";
      }
    }
  }

  const options1: string[] = [
    "I'm Religious",
    "I'm Spiritualist",
    "I'm Atheist",
    "I'm Agnostic",
    "I don't know man",
  ];
  const options2Religion: string[] = [
    "Christianity",
    "Judasim",
    "Islam",
    "Hindusim",
    "Other",
  ];

  const options3Religion: string[] = [
    "Eastern Orthodox",
    "Catholicism",
    "Baptist",
    "Other",
  ];

  const options3Islam: string[] = [
    "Suni",
    "Shia",
    "Sufi",
    "Nation Of Islam",
    "Other",
  ];

  const optionsSpirtual: string[] = [
    "Meditation and Mindfulness",
    "Prayer & Worship",
    "Yoga and Movement",
    "Nature connection",
    "Other",
  ];

  function handleOptionClick(option: string) {
    setSelectedOption(option);
    setUserPreferences((prevPreferences) => {
      if (!prevPreferences.includes(option)) {
        return [...prevPreferences, option];
      }
      return prevPreferences;
    });
    if (dropDownDiv.current!.style.opacity === "1") {
      dropDownDiv.current!.style.opacity = "0";
      dropDownDiv.current!.style.zIndex = "1";
    }
  }

  function handleBackClick() {
    setUserPreferences((prevPreferences) => {
      const updatedPreferences = prevPreferences.slice(0, -1); // Remove the last element
      const lastOption =
        updatedPreferences[updatedPreferences.length - 1] || ""; // Get the new last element
      setSelectedOption(lastOption); // Set the last element as the selected option
      return updatedPreferences;
    });

    // Adjust the currentIndex based on your logic
    setCurrentIndex((prevIndex) => {
      if (prevIndex === 1 && selectedOption === "Islam") {
        return (prevIndex - 2) % components.length;
      } else if (prevIndex === 4) {
        console.log("Loggign the previndex in back function", prevIndex)
        return (prevIndex - 4) % components.length;
      } else if (
        (prevIndex === 5 && userPreferences.includes("I'm Atheist")) ||
        (prevIndex === 5 && userPreferences.includes("I'm Agnostic")) ||
        (prevIndex === 5 && userPreferences.includes("I don't know man"))
      ) {
        return (prevIndex - 5) % components.length;
      } else {
        return (prevIndex - 1 + components.length) % components.length; // Ensure the index stays positive
      }
    });
  }

  //Get access to the laset option
  useEffect(() => {
    console.log("Logging selectedOption", selectedOption);
  }, [selectedOption]);
  useEffect(() => {
    console.log("Logging the user Prefernecs", userPreferences);
  }, [userPreferences]);

  useEffect(() => {
    console.log("Logging the current Index", currentIndex);
  }, [currentIndex]);

  function handleNextClick() {
    setSelectedOption("");
    console.log("Logging the user Prefernecs", userPreferences);

    if (selectedOption === options1[0]) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % components.length);
      setSelectedOption("");
    } else if (selectedOption === options1[1]) {
      const choiceOneSpiritualIndex = components.findIndex(
        (c) => c.key === "choiceOneSpiritual"
      );
      setCurrentIndex(choiceOneSpiritualIndex); // Move to ChoiceOneSpiritual
    } else if (
      selectedOption === options1[2] ||
      selectedOption === options1[3] ||
      selectedOption === options1[4]
    ) {
      const choiceNone = components.findIndex((c) => c.key === "choiceNone");

      setCurrentIndex(choiceNone); // Move to ChoiceOneSpiritual
    } else if (currentIndex === 2 || currentIndex === 3 || currentIndex === 4) {
      const choiceNone = components.findIndex((c) => c.key === "choiceNone");

      setCurrentIndex(choiceNone); // Move to ChoiceOneSpiritual
    }

    if (
      selectedOption === options2Religion[0] ||
      selectedOption === options2Religion[1]
    ) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % components.length);
    } else if (selectedOption === options2Religion[2]) {
      setCurrentIndex((prevIndex) => (prevIndex + 2) % components.length);
    }
  }
  function removeOptionClick(option: string) {

    setUserPreferences((prevPreferences) => { 
      return prevPreferences.slice(0, -1);

    });

    setSelectedOption(option);
  }

  const addUserPreference = () => {
    setUserPreferences((prevPreferences) => [...prevPreferences, selectedOption]);
    setSelectedOption(""); // Clear the input after adding to preferences
  };
  const components = [
    {
      key: "choiceOne",
      component: (
        <ChoiceOne
          toggleDropDownDiv={toggleDropDownDiv}
          selectedOption={selectedOption}
          handleOptionClick={handleOptionClick}
          removeOptionClick={removeOptionClick}
          dropDownDiv={dropDownDiv}
          options1={options1}
        />
      ),
    },
    {
      key: "choiceTwoReligion",
      component: (
        <ChoiceTwoReligion
          toggleDropDownDiv={toggleDropDownDiv}
          selectedOption={selectedOption}
          handleOptionClick={handleOptionClick}
          removeOptionClick={removeOptionClick}
          dropDownDiv={dropDownDiv}
          options2Religion={options2Religion}
          handleBackClick={handleBackClick}
        />
      ),
    },
    {
      key: "choiceThreeRelgion",
      component: (
        <ChoiceThreeReligion
          toggleDropDownDiv={toggleDropDownDiv}
          selectedOption={selectedOption}
          handleOptionClick={handleOptionClick}
          removeOptionClick={removeOptionClick}
          dropDownDiv={dropDownDiv}
          options3Religion={options3Religion}
          handleBackClick={handleBackClick}
        />
      ),
    },

    {
      key: "choiceThreeRelgion",
      component: (
        <ChoiceIslam
          toggleDropDownDiv={toggleDropDownDiv}
          selectedOption={selectedOption}
          handleOptionClick={handleOptionClick}
          removeOptionClick={removeOptionClick}
          dropDownDiv={dropDownDiv}
          options3Islam={options3Islam}
          handleBackClick={handleBackClick}
        />
      ),
    },

    {
      key: "choiceOneSpiritual",
      component: (
        <ChoiceOneSpiritual
          toggleDropDownDiv={toggleDropDownDiv}
          selectedOption={selectedOption}
          handleOptionClick={handleOptionClick}
          removeOptionClick={removeOptionClick}
          dropDownDiv={dropDownDiv}
          optionsSpirtual={optionsSpirtual}
          handleBackClick={handleBackClick}
        />
      ),
    },
    {
      key: "choiceNone",
      component: (
        <ChoiceNone
          toggleDropDownDiv={toggleDropDownDiv}
          selectedOption={selectedOption}
          handleOptionClick={handleOptionClick}
          removeOptionClick={removeOptionClick}
          handleBackClick={handleBackClick}
          setSelectedOption={setSelectedOption}
          userPreferences={userPreferences} // Pass the userPreferences state
          setUserPreferences={setUserPreferences} // Pass the setter function
          addUserPreference={addUserPreference} // Pass the new function as a prop

        />
      ),
    },

    // Add more components as needed
  ];

  //List of Questions Rendered within the Div

  return (
    <>
      <main className="bodyWrapper">
        <NavComponent />
        <div className="site-container w-full h-full flex items-center justify-center">
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-full flex items-center justify-center flex-col gap-4">
              <div className="loginForm noPadding text-white flex items-center justify-center flex-col">
                <div className="questionHeader flex flex-row items-center justify-center relative">
                  <div className="purpleOverlay"></div>

                  <div className="logoCircle"></div>
                </div>

                {components[currentIndex].component}

                <div className="p-8 relative w-full">
                  <button
                    onClick={handleNextClick}
                    type="submit"
                    className=" z-10 p-4 w-full secondary-font relative  text-[1rem] text-white purpleBg border border-[rgba(0,0,0,.5)] rounded-lg abc-diatype-Medium formBtn "
                  >
                   {currentIndex === 5 ? "Submit" : "Next"}
                  </button>

                  <div className="flex flex-row gap-2 items-center justify-center mt-5">
                    <p className="secondary-font font-light text-[1rem] text-gray-500 text-center">
                      Website language
                    </p>
                    <p className="secondary-font font-light text-[1rem] text-white text-center">
                      English
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Questionaire;
