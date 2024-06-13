import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Circles, InfinitySpin, ThreeDots } from "react-loader-spinner";


interface LoadingProps {
  isLoading?: any; // Making the prop optional
}



const ButtonLoadingComponent: React.FC<LoadingProps> = ({ isLoading }) => {
  return (
    <ThreeDots
          width="16"
          height = "16"
          color="#fff"
        />

  );
}

export default ButtonLoadingComponent