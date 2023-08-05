import {
  Button,
  ButtonBase,
  Card,
  CardContent,
  CardHeader,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function MuseumShuffle() {
  const navigate = useNavigate();
  return (
    <ButtonBase
      onClick={() => {
        navigate("/muse");
      }}
    >
      <Paper
      elevation={6}
        sx={{
          position: "relative",
          backgroundColor: "grey.800",
          width: 345,
          height: 100,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundImage: `url('https://www.jamesgmartin.center/wp-content/uploads/2020/07/AdobeStock_358873178-1024x532.jpeg')`,
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h4">Museum Shuffle</Typography>
      </Paper>
    </ButtonBase>
  );
}

export default MuseumShuffle;
