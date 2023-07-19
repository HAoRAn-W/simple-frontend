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
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../app/slices/auth";

function NavBar() {
  const [tabValue, setTabValue] = useState(false);


  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    navigate(`/${newValue}`);
  };

  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleClickUserMenu = (path) => {
    setAnchorElUser(null);
    navigate(`/${path}`)
  };

  const handleLogout = () => {
    setAnchorElUser(null);
    dispatch(logout());
    navigate('/');
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
      <ButtonBase
        disableRipple
        onClick={() => {
          navigate(`/`);
          setTabValue(false);
        }}
      >
        <Typography variant="h4">whr.one</Typography>
      </ButtonBase>
      <Box>
        <Tabs value={tabValue} onChange={handleTabChange}>
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
          onClose={() => setAnchorElUser(null)}
        >
          <MenuItem onClick={() => handleClickUserMenu('profile')}>
            <Typography textAlign="center">Profile</Typography>
          </MenuItem>
          <MenuItem onClick={() =>  handleClickUserMenu('favorites')}>
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
