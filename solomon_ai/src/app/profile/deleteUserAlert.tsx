import Link from "next/link";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { FC, FormEvent, RefObject, useEffect, useState } from "react";
import Image from "next/image";

import PopupImage from "../../../public/assets/homePage/popup_header.png";
import { SuccessPopup } from "../components/SucessPopup";

import FaceIcon from "../../../public/faceIconSolomon.png";

interface PopupProps {
  toggleDelete?: () => void;
  deletingUser: boolean;
  deleteUserFinal: boolean;
  setDeleteUserFinal:  React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteUser: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserDeleteAlert: React.FC<PopupProps> = ({
  toggleDelete,
  deletingUser,
  setDeleteUser,
  deleteUserFinal,
  setDeleteUserFinal
}) => {
  const { data: session, status } = useSession();

  //Keeping track of deleting the user

  //Keep track of the updating index

  const ignoreDelete = () => {
    setDeleteUser(false);
  };

  const deleteUser = () => {
    setDeleteUser(true);
    setDeleteUserFinal(true)    
  };

  useEffect(() => {}, [deletingUser, deleteUserFinal]);
  
  return (
    <div className="homePopup feedback">
      <div className="homePopupContainer feedback deleteForm">
        <div className="homePopupFormContainer gap-[5px] deleteForm w-full flex flex-col items-center !justify-start">
          <div className="popupHeader feedback">
            <Image src={PopupImage} alt="popupheader" />
          </div>

          <div className=" homePopupInnerWrapper text-left flex flex-col items-start gap-[5px] mb-[5px] md:mb-[50px] mt-[20px] mx-[20px]">
            <h2 className=" font-med text-[28px] text-center text-black">
              Are You Sure You Would Like To Leave This Realm?
            </h2>
          </div>

          {/* <form
            className="flex flex-col w-full  gap-[15px] "
          >
            <textarea
              placeholder="How is the app? What could we do better?"
              className="feedBackTextArea"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            >
              {" "}
            </textarea>

            <p className="text-[14px]">
              We value your insights, could you tell us your experience with the
              products performance
            </p>

            <button type="submit" className="joinBeta !bg-black !text-white   ">
              Submit
            </button>

          </form> */}

          <div className="flex flex-col gap-[5px]">
            <button
              type="submit"
              onClick={deleteUser}
              className="joinBeta w-full !bg-[#4D36DF] !text-white mx-[1rem]   "
            >
              Delete Character
            </button>
            <button
            onClick={ignoreDelete}
              type="submit"
              className="joinBeta w-full !bg-black !text-white mx-[1rem]   "
            >
              Return To Realm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
