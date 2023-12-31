import { Box, Link, Typography } from "@mui/material";
import React from "react";

function Footer() {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        mt: 4,
        mb: 2,
      }}
    >
      <Typography variant="h5" align="center">
        whr.one
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="text.secondary"
        fontWeight={"bold"}
      >
        The best people in life are free
      </Typography>
      <Copyright />
    </Box>
  );
}

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://whr.one/">
        whr.one
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default Footer;
