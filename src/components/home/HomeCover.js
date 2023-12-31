import { Paper } from "@mui/material";
import React from "react";

function HomeCover() {
  return (
    <Paper
      sx={{
        position: "relative",
        backgroundColor: "grey.800",
        mb: 4,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: `url('https://i.imgur.com/FpHwkAJ.gif')`,
        width: "100vw", // Set the width to the viewport width
        height: "50vh",
        borderRadius: 0,
      }}
    ></Paper>
  );
}

export default HomeCover;
