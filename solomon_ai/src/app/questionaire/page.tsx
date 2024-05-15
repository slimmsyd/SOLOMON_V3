"use client";
import { useState, useRef, useEffect } from "react";
import NavComponent from "../navigation/navComponent";

const Questionaire = () => {


  const dropDownDiv = useRef<HTMLDivElement>(null);

  function toggleDropDownDiv() {


    if (dropDownDiv.current) {
      let dropdownDivCurrent = dropDownDiv.current;
      if (dropdownDivCurrent.style.opacity === "1") {
        dropdownDivCurrent.style.top = "45%";
        dropdownDivCurrent.style.opacity = "0";
      } else {
        dropdownDivCurrent.style.top = "55%";
        dropdownDivCurrent.style.opacity = "1";
      }
    }
  }

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

                <div className="p-8 w-full relative">
                  <h4>Are you religious or spiritualist?</h4>

                  <div
                    onClick={toggleDropDownDiv}
                    className=" dropDownSelection my-8  w-full p-4 secondary-font bg-transparent border border-[rgba(0,0,0,.5)] rounded-lg outline-none text-white formInput relative z-10"
                  >
                    <svg
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
                    I'm Religious
                  </div>

                  <div ref={dropDownDiv} className="dropDownSelectionDiv">
                    <ul>
                      <li> I'm Religious</li>
                      <li> I'm Spirutalist</li>
                      <li> I'm athesit</li>
                      <li> I'm agnostic</li>
                      <li> I don't know man</li>
                    </ul>
                  </div>

                  <button
                    type="submit"
                    className="p-4 w-full secondary-font  text-[1rem] text-black bg-white border border-[rgba(0,0,0,.5)] rounded-lg abc-diatype-Medium formBtn "
                  >
                    Login
                  </button>
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
