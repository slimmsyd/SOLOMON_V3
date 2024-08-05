import Link from "next/link";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { FC, FormEvent, RefObject, useEffect, useState } from "react";
import Image from "next/image";

import PopupImage from "../../../../public/assets/homePage/popup_header.png";

import FaceIcon from "../../../public/faceIconSolomon.png";

interface PopupProps {
  toggleDelete?: () => void;
  deletingUser: boolean;
  deleteUserFinal: boolean;
  setDeleteUserFinal: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteUser: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PayForAppPopup = ({}) => {
  const { data: session, status } = useSession();
  const [userId, setUserId] = useState<string>("");

  return (
    <div className="homePopup feedback !items-center !justify-center">
      <div className="homePopupContainer  flexStartImportant feedback deleteForm">
        <div className="homePopupFormContainer gap-[5px] deleteForm w-full flex flex-col items-center !justify-start">
          <div className=" homePopupInnerWrapper borderRadius text-center flex flex-col items-center gap-[5px] ">
            <div className="popupLinearGradient flex flex-col gap-[15px]">
              <h3 className="text-black font-medium">Peace Unto You</h3>


              <span className="!text-center !text-[#717171]">
                To join the spirtual evolution of Mankind, please send your
                support to keep the platform running
              </span>

              <h5>Thank You For Willing To Improve Thyself</h5>

              <span className = "montlyLabel">Monthly</span>
           
            </div>
          </div>

          <div className="flex flex-col gap-[5px]">
            <Link
              href="http://localhost:3000/payment-link"
              className="joinBeta w-full flex items-center justify-center !bg-[#4D36DF] !text-white mx-[1rem]   "
            >
              Upgrade Plan
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
