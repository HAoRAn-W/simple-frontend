import { ButtonBase, Paper, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function MuseumShuffle() {
  const navigate = useNavigate();
  return (
    <Paper
      elevation={6}
      sx={{
        position: "relative",
        backgroundColor: "grey.800",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: `url('https://www.jamesgmartin.center/wp-content/uploads/2020/07/AdobeStock_358873178-1024x532.jpeg')`,
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: 100,
      }}
    >
      <ButtonBase
        onClick={() => {
          navigate("/muse");
        }}
      >
        <Typography variant="h4">Museum Shuffle ✨</Typography>
      </ButtonBase>
    </Paper>
  );
}

export default MuseumShuffle;
