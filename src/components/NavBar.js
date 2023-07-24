import {
  Avatar,
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
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../app/slices/auth";

function NavBar() {
  const [tabValue, setTabValue] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

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
    navigate(`/${path}`);
  };

  const handleLogout = () => {
    setAnchorElUser(null);
    dispatch(logout());
    navigate("/");
  };

  return (
    <Toolbar
      style={{ backgroundColor: "transparent" }}
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        display: "flex",
      }}
    >
      <div
        style={{
          display: "flex",
          flex: 2,
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <ButtonBase
          disableRipple
          onClick={() => {
            navigate(`/`);
            setTabValue(false);
          }}
        >
          <Typography variant="h3">whr.one</Typography>
        </ButtonBase>
      </div>

      <div
        style={{
          display: "flex",
          flex: 8,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab disableRipple value="category" label="Category" />
          <Tab disableRipple value="tag" label="Tag" />
          <Tab disableRipple value="about" label="About" />
        </Tabs>
      </div>

      <div
        style={{
          display: "flex",
          flex: 2,
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        {!user ? (
          <Grid
            container
            display={"flex"}
            justifyContent={"flex-end"}
            spacing={3}
          >
            <Grid item>
              <ButtonBase
                onClick={() => {
                  setTabValue(false);
                  navigate("/login");
                }}
              >
                <Typography>Login</Typography>
              </ButtonBase>
            </Grid>
            <Grid item>
              <ButtonBase
                onClick={() => {
                  setTabValue(false);
                  navigate("/signup");
                }}
              >
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
          <MenuItem onClick={() => handleClickUserMenu("profile")}>
            <Typography textAlign="center">Profile</Typography>
          </MenuItem>
          <MenuItem onClick={() => handleClickUserMenu("favorites")}>
            <Typography textAlign="center">favorites</Typography>
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <Typography textAlign="center">log out</Typography>
          </MenuItem>
          {user && user.roles.includes("ROLE_ADMIN") && (
            <MenuItem
              onClick={() => {
                setAnchorElUser(null);
                navigate("/editor");
              }}
            >
              <Typography textAlign="center">Editor</Typography>
            </MenuItem>
          )}
        </Menu>
      </div>
    </Toolbar>
  );
}

export default NavBar;
