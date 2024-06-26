import { Box, Container, Toolbar } from "@mui/material";
import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Components/Shared/Footer";
import PageHeader from "../Components/Shared/PageHeader";
import SideDrawer from "../Components/Shared/SideDrawer";
import TopAppBar from "../Components/Shared/TopAppBar";

const MainLayout = () => {
  // Scroll-to-top
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  // drawer width
  const drawerWidth = "290px";

  return (
    <Container maxWidth="xxl" sx={{ display: "flex" }}>
      <TopAppBar drawerWidth={drawerWidth} />
      <SideDrawer drawerWidth={drawerWidth} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Toolbar sx={{ mb: "10px" }} />
        <PageHeader />
        <Box
          sx={{
            flexGrow: 1,
            height: 1,
          }}
        >
          <Outlet />
        </Box>
        <Footer />
      </Box>
    </Container>
  );
};

export default MainLayout;
