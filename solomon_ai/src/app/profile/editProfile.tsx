"use client";
import { useState, useEffect } from "react";
import React, { FC, RefObject } from "react";

interface Props {
  showEditSettings: boolean;
  showEditSettingsDiv: () => void;
  handleKeyDown: (e: React.FormEvent<HTMLFormElement>) => void; // Correct event type for keydown
  setZodiac: React.Dispatch<React.SetStateAction<string>>;
  setLifePathNumber: React.Dispatch<React.SetStateAction<string>>;
  setEnnealogyNumber: React.Dispatch<React.SetStateAction<string>>;
  setCardologyNumber: React.Dispatch<React.SetStateAction<string>>;
  setMylesBridgeType: React.Dispatch<React.SetStateAction<string>>;
  setNameNumerolgyNumber: React.Dispatch<React.SetStateAction<string>>;
  setBirthDay: React.Dispatch<React.SetStateAction<string>>;
  profileProgresLoading: boolean;
}

const EditProfileSettings: FC<Props> = ({
  showEditSettings,
  showEditSettingsDiv,
  handleKeyDown,
  setZodiac,
  setLifePathNumber,
  setEnnealogyNumber,
  setCardologyNumber,
  setMylesBridgeType,
  setNameNumerolgyNumber,
  setBirthDay,
  profileProgresLoading,
}) => {
  return (
    <>
      <div
        className={`editProfileSettingsWrapper fixed bottom-[10%] ${
          showEditSettings ? "show" : ""
        }`}
      >
        <div className="editProfileSettingsContainer p-[2rem]">
          <div className="mb-[20px] font-bold flex flex-row gap-[5px]">
            <h3>Edit Profile</h3>

            <button onClick={() => showEditSettingsDiv()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="black"
                viewBox="0 0 24 24"
              >
                <path d="M15.673 3.913a3.121 3.121 0 1 1 4.414 4.414l-5.937 5.937a5 5 0 0 1-2.828 1.415l-2.18.31a1 1 0 0 1-1.132-1.13l.311-2.18A5 5 0 0 1 9.736 9.85zm3 1.414a1.12 1.12 0 0 0-1.586 0l-5.937 5.937a3 3 0 0 0-.849 1.697l-.123.86.86-.122a3 3 0 0 0 1.698-.849l5.937-5.937a1.12 1.12 0 0 0 0-1.586M11 4A1 1 0 0 1 10 5c-.998 0-1.702.008-2.253.06-.54.052-.862.141-1.109.267a3 3 0 0 0-1.311 1.311c-.134.263-.226.611-.276 1.216C5.001 8.471 5 9.264 5 10.4v3.2c0 1.137 0 1.929.051 2.546.05.605.142.953.276 1.216a3 3 0 0 0 1.311 1.311c.263.134.611.226 1.216.276.617.05 1.41.051 2.546.051h3.2c1.137 0 1.929 0 2.546-.051.605-.05.953-.142 1.216-.276a3 3 0 0 0 1.311-1.311c.126-.247.215-.569.266-1.108.053-.552.06-1.256.06-2.255a1 1 0 1 1 2 .002c0 .978-.006 1.78-.069 2.442-.064.673-.192 1.27-.475 1.827a5 5 0 0 1-2.185 2.185c-.592.302-1.232.428-1.961.487C15.6 21 14.727 21 13.643 21h-3.286c-1.084 0-1.958 0-2.666-.058-.728-.06-1.369-.185-1.96-.487a5 5 0 0 1-2.186-2.185c-.302-.592-.428-1.233-.487-1.961C3 15.6 3 14.727 3 13.643v-3.286c0-1.084 0-1.958.058-2.666.06-.729.185-1.369.487-1.961A5 5 0 0 1 5.73 3.545c.556-.284 1.154-.411 1.827-.475C8.22 3.007 9.021 3 10 3A1 1 0 0 1 11 4"></path>
              </svg>
            </button>
          </div>

          <form
            onSubmit={handleKeyDown}
            className="flex flex-col gap-[10px] settingsDiv"
          >
            <div className="flex flex-col gap-[5px] text-black">
              <label>Zodiac Sign</label>
              <input
                onChange={(e) => setZodiac(e.target.value)}
                className="editInput"
                placeholder="Enter Your Zodiac Sign"
              ></input>
            </div>
            <div className="flex flex-col gap-[5px] text-black">
              <label>Life Path Number</label>
              <input
                onChange={(e) => setLifePathNumber(e.target.value)}
                className="editInput"
                placeholder="Enter Your Life Path Number"
              ></input>
            </div>
            <div className="flex flex-col gap-[5px] text-black">
              <label>Name Numerical Signature</label>
              <input
                onChange={(e) => setNameNumerolgyNumber(e.target.value)}
                className="editInput"
                placeholder="Enter Name Numerological Signature"
              ></input>
            </div>
            <div className="flex flex-col gap-[5px] text-black">
              <label>Ennealogy Number</label>
              <input
                onChange={(e) => setEnnealogyNumber(e.target.value)}
                className="editInput"
                placeholder="Enter Your Ennegram Number"
              ></input>
            </div>
            <div className="flex flex-col gap-[5px] text-black">
              <label>Cardology Personality Type</label>
              <input
                onChange={(e) => setCardologyNumber(e.target.value)}
                className="editInput"
                placeholder="Enter Your Cardology Sign"
              ></input>
            </div>
            <div className="flex flex-col gap-[5px] text-black">
              <label>MBPT</label>
              <input
                onChange={(e) => setMylesBridgeType(e.target.value)}
                className="editInput"
                placeholder="Enter Your Myles Bridge Type"
              ></input>
            </div>
            <div className="flex flex-col gap-[5px] text-black">
              <div className = "flex flex-row gap-[5px] items-center">
              <label>Date Of Birth</label>
            <span className = "text-[10px] text-[#5353539d]">day, month, year</span>
              </div>
              <input
                onChange={(e) => setBirthDay(e.target.value)}
                className="editInput"
                placeholder="Enter Your Date Of Birth"
              ></input>
            </div>

            <button type="submit">{`${
              profileProgresLoading ? "Loding..." : "Save Changes"
            }`}</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfileSettings;
