import {
  Avatar,
  Box,
  ButtonBase,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../app/slices/auth";

function NavBar() {
  const [tabValue, setTabValue] = useState("home");

  const location = useLocation();
  const path = location.pathname.split("/")[1];

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
    navigate(`/${newValue}`);
  };

  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    setAnchorElUser(null);
    dispatch(logout());
  };

  useEffect(() => {
    if (path === "") {
      setTabValue("home");
    } else {
      setTabValue(path);
    }
  }, [path]);

  const handleClick = () => {
    navigate(`/`);
    setTabValue('home');
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
      <ButtonBase disableRipple onClick={handleClick}>
        <Typography variant="h4">whr.one</Typography>
      </ButtonBase>
      <Box>
        <Tabs value={tabValue} onChange={handleChange}>
        <Tab disableRipple value="home" label="Home" />
          <Tab disableRipple value="category" label="Category" />
          <Tab disableRipple value="tag" label="Tag" />
          <Tab disableRipple value="about" label="About" />
        </Tabs>
      </Box>
      <Box>
        {!localStorage.getItem("user") ? (
          <Grid
            container
            display={"flex"}
            justifyContent={"center"}
            spacing={3}
          >
            <Grid item>
              <ButtonBase onClick={() => navigate("/login")}>
                <Typography>Login</Typography>
              </ButtonBase>
            </Grid>
            <Grid item>
              <ButtonBase onClick={() => navigate("/signup")}>
                <Typography>Sign up</Typography>
              </ButtonBase>
            </Grid>
          </Grid>
        ) : (
          <Tooltip title="User menu">
            <IconButton onClick={handleOpenUserMenu}>
              <Avatar sx={{ bgcolor: "black" }}>W</Avatar>
            </IconButton>
          </Tooltip>
        )}
        <Menu
          sx={{ mt: "45px" }}
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem onClick={handleCloseUserMenu}>
            <Typography textAlign="center">Profile</Typography>
          </MenuItem>
          <MenuItem onClick={handleCloseUserMenu}>
            <Typography textAlign="center">favorites</Typography>
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <Typography textAlign="center">log out</Typography>
          </MenuItem>
        </Menu>
      </Box>
    </Toolbar>
  );
}

export default NavBar;
