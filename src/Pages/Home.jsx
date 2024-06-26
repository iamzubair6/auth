import { Box } from "@mui/material";
import React from "react";
import CropList from "../Components/Home/CropList";
import MedicineList from "../Components/Home/MedicineList";
import Stats from "../Components/Home/Stats";

const Home = () => {
  return (
    <Box>
      <Stats />
      <CropList />
      <MedicineList />
    </Box>
  );
};

export default Home;
