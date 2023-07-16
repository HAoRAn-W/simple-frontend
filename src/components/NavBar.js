import {
  Avatar,
  Box,
  ButtonBase,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function NavBar() {
  const [value, setValue] = useState("");
  
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue((prev) => newValue);
    navigate(`/${newValue}`);
  };

  useEffect(() => {
    setValue(path);
  }, [value])

  const handleClick = () => {
    navigate(`/`);
    setValue((prev) => "");
  }
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
      <ButtonBase disableRipple onClick={handleClick}>
        <Typography variant="h4">whr.one</Typography>
      </ButtonBase>
      <Box>
        <Tabs value={value} onChange={handleChange}>
          <Tab disableRipple value="category" label="Category" />
          <Tab disableRipple value="tag" label="Tag" />
          <Tab disableRipple value="about" label="About" />
        </Tabs>
      </Box>
      <Avatar sx={{ bgcolor: "black" }}>W</Avatar>
    </Toolbar>
  );
}

export default NavBar;
