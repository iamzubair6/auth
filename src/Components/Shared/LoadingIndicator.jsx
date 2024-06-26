import { Box, CircularProgress } from "@mui/material";
import React from "react";

const LoadingIndicator = ({ height = null }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: height ?? 1,
        width: 1,
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingIndicator;
