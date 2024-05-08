import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function LoadingComponent({isLoading}) {
  return (
    <Box className={`flex flex-row justify-center items-center ${isLoading ? 'flex-1' : ''}`}>
      <CircularProgress />
    </Box>
  );
}
