import { Avatar, Box, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue((prev) => newValue);
    navigate(`/${newValue}`);
  };
  return (
    <Toolbar
      style={{ backgroundColor: "transparent" }}
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="h4">whr.one</Typography>
      <Box>
        <Tabs value={value} onChange={handleChange}>
          <Tab value="category" label="Category" />
          <Tab value="tag" label="Tag" />
          <Tab value="about" label="About" />
        </Tabs>
      </Box>
      <Avatar sx={{ bgcolor: "black" }}>W</Avatar>
    </Toolbar>
  );
}

export default NavBar;
