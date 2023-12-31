import { Box, Paper, Typography } from "@mui/material";
import React from "react";

function NotFound() {
  return (
    <div>
      <Paper
        sx={{
          position: "relative",
          backgroundColor: "grey.800",
          mb: 4,
          backgroundSize: "cover",
          color: "whitesmoke",
          backgroundPosition: "center",
          backgroundImage: `url('https://source.unsplash.com/random?wallpapers')`,
          width: "100vw", // Set the width to the viewport width
          height: "90vh", // Set the height to the viewport height
        }}
      >
        {
          <img
            style={{ display: "none" }}
            src="https://source.unsplash.com/random?wallpapers"
            alt="pic"
          />
        }

        <Box
          sx={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: "rgba(0,0,0,.3)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h1">Page Not Found 👀</Typography>
        </Box>
      </Paper>
    </div>
  );
}

export default NotFound;
