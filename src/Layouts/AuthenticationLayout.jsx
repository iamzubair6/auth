import { Box, Container } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import loginBg from "../Assets/login-bg.png";
// import BrandLogo from '../Assets/BrandLogo.svg';

const AuthenticationLayout = () => {
  return (
    <Container
      maxWidth="xxl"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundImage: `url(${loginBg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <Box
        sx={{
          bgcolor: "primary.main",
          borderRadius: "4px",
          opacity: "0.9",
        }}
      >
        {/* <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Box component="img" src={BrandLogo} />
        </Box> */}
        <Outlet />
      </Box>
    </Container>
  );
};

export default AuthenticationLayout;
