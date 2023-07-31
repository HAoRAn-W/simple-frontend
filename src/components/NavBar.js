import {
  ButtonBase,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../app/slices/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

function NavBar() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

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
          }}
        >
          <Typography variant="h3" fontFamily={"Lato"} gutterBottom>
            whr.one
          </Typography>
        </ButtonBase>
      </div>

        <Grid
          flex={8}
          container
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
          spacing={4}
        >
          <Grid item>
            <ButtonBase disableRipple>
              <Typography
                variant="h5"
                onClick={() => {
                  navigate(`/category`);
                }}
              >
                CATEGORY
              </Typography>
            </ButtonBase>
          </Grid>
          <Grid item>
            <ButtonBase
              disableRipple
              onClick={() => {
                navigate(`/tag`);
              }}
            >
              <Typography variant="h5">TAG</Typography>
            </ButtonBase>
          </Grid>
          <Grid item>
            <ButtonBase
              disableRipple
              onClick={() => {
                navigate(`/about`);
              }}
            >
              <Typography variant="h5">ABOUT</Typography>
            </ButtonBase>
          </Grid>
        </Grid>

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
                  navigate("/login");
                }}
              >
                <Typography>Login</Typography>
              </ButtonBase>
            </Grid>
            <Grid item>
              <ButtonBase
                onClick={() => {
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
              <FontAwesomeIcon icon={faCircleUser} />
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
            <Typography textAlign="center">Favorites</Typography>
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
          <MenuItem onClick={handleLogout}>
            <Typography textAlign="center">Logout</Typography>
          </MenuItem>
        </Menu>
      </div>
    </Toolbar>
  );
}

export default NavBar;
