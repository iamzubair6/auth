import { Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import MessegeLogo from "../../Assets/icons/messege-logo.svg";

const PasswordResetConfirmation = () => {
  return (
    <Box
      sx={{
        padding: "45px",
        minWsidth: "425px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Box component="img" src={MessegeLogo} height="50px" width="60px" />
      </Box>
      <Typography
        sx={{
          pt: "40px",
          lineHeight: "27px",
          color: "textWhite",
          fontSize: "16px",
          fontWeight: 600,
          textAlign: "center",
        }}
      >
        We've sent you an email with a link to reset your password.
      </Typography>
      <Typography
        sx={{
          color: "textWhite",
          fontWeight: 500,
          fontSize: "18px",
          lineHeight: "25px",
          textAlign: "center",
          px: "15px",
          pt: "20px",
        }}
      >
        Kindly check your spam and promotions folder if it doesn't appear in
        your main mailbox.
      </Typography>
      <Typography
        type="text"
        color="textWhite"
        sx={{ textAlign: "center", pt: "30px", fontSize: "16px" }}
      >
        Didn’t receive the email?{" "}
        <Box
          component={Link}
          to="/auth/password-reset"
          color="textWhite"
          sx={{
            textDecoration: "unset",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          Try Again
        </Box>
      </Typography>
    </Box>
  );
};

export default PasswordResetConfirmation;
