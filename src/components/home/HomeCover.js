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
        backgroundImage: `url('https://source.unsplash.com/random?wallpapers')`,
        width: "100vw", // Set the width to the viewport width
        height: "80vh", // Set the height to the viewport height
      }}
    ></Paper>
  );
}

export default HomeCover;