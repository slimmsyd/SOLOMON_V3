import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Circles, InfinitySpin } from "react-loader-spinner";


interface LoadingProps {
  isLoading?: any; // Making the prop optional
}



const LoadingComponent: React.FC<LoadingProps> = ({ isLoading }) => {
  return (
    <InfinitySpin
          width="95"
          color="#fff"
        />

  );
}

export default LoadingComponent