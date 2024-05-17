import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Circles } from "react-loader-spinner";


interface LoadingProps {
  isLoading?: any; // Making the prop optional
}



const LoadingComponent: React.FC<LoadingProps> = ({ isLoading }) => {
  return (
    <Circles
          height="95"
          width="95"
          color="#fff"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />

  );
}

export default LoadingComponent