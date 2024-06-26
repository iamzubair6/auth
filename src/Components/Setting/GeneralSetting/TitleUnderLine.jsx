import { Typography } from "@mui/material";
import React from "react";

const TitleUnderLine = ({
  title = "",
  underline = false,
  center = false,
  right = false,
  color = false,
}) => {
  return (
    <Typography
      fontWeight={400}
      fontSize="18px"
      lineHeight="24px"
      component="div"
      sx={{
        mb: "25px",
        position: "relative",
        textAlign: center ? "center" : right ? "right" : "left",
        color: color ? "#203144" : "unset",
        whiteSpace: "nowrap",

        "&:after": underline
          ? {
              content: `""`,
              position: "absolute",
              width: "72px",
              height: "2px",
              bgcolor: "#0B0B0B !important",
              bottom: "-10px",
              left: right ? "unset" : "0",
              right: center ? 0 : right ? "0" : "unset",
              mx: "auto",
            }
          : "",
      }}
    >
      {title}
    </Typography>
  );
};

export default TitleUnderLine;
