import {
  ButtonBase,
  Drawer,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../app/slices/auth";
import {
  HeaderBar,
  LogoDiv,
  LogoTypography,
  SectionGrid,
  SectionTypography,
} from "../../styles/style";
import Image from "mui-image";
import avatars from "../avatar/avatars";
import AuthService from "../../app/services/auth.service";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faEllipsisVertical,
// } from "@fortawesome/free-solid-svg-icons";

function NavBar() {
  const navigate = useNavigate();

  const isMediumUpScreen = useMediaQuery((theme) => theme.breakpoints.up("md"));

  const isMediumDownScreen = useMediaQuery((theme) =>
    theme.breakpoints.down("md")
  );

  const dispatch = useDispatch();
  const user = AuthService.getUser();

  const [anchorElUser, setAnchorElUser] = useState(null);

  // const [drawerOpen, setDrawerOpen] = useState(false);

  // const toggleDrawer = (isOpen) => {
  //   setDrawerOpen(isOpen);
  // };

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
    <HeaderBar>
      <LogoDiv>
        <ButtonBase
          disableRipple
          onClick={() => {
            navigate(`/`);
          }}
        >
          <LogoTypography variant="h3">whr.one</LogoTypography>
        </ButtonBase>
      </LogoDiv>
      {isMediumUpScreen && (
        <SectionGrid container spacing={4}>
          <Grid item>
            <ButtonBase disableRipple>
              <SectionTypography
                onClick={() => {
                  navigate(`/category`);
                }}
              >
                CATEGORY
              </SectionTypography>
            </ButtonBase>
          </Grid>
          <Grid item>
            <ButtonBase
              disableRipple
              onClick={() => {
                navigate(`/tag`);
              }}
            >
              <SectionTypography>TAG</SectionTypography>
            </ButtonBase>
          </Grid>
          <Grid item>
            <ButtonBase
              disableRipple
              onClick={() => {
                navigate(`/about`);
              }}
            >
              <SectionTypography>ABOUT</SectionTypography>
            </ButtonBase>
          </Grid>
        </SectionGrid>
      )}

      <div
        style={{
          display: "flex",
          flex: 3,
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
              <Image
                src={
                  user.avatarId
                    ? avatars.filter((avatar) => avatar.id === user.avatarId)[0]
                        .img
                    : avatars[0].img
                }
                style={{ width: "50px", height: "50px", borderRadius: "50%" , marginRight: 10}}
                alt="avatar"
              />
            </IconButton>
          </Tooltip>
        )}
        {/* {isMediumDownScreen && (
          <ButtonBase onClick={() => {toggleDrawer(true)}}>
            <FontAwesomeIcon
              icon={faEllipsisVertical}
              style={{ color: "#000000", height: "25px" }}
            />
          </ButtonBase>
        )} */}
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

        {/* <Drawer
            anchor='top '
            open={drawerOpen}
            onClose={() => {toggleDrawer(false)}}
          >
             <ButtonBase
              disableRipple
              onClick={() => {
                navigate(`/tag`);
              }}
            >
              <SectionTypography>Category</SectionTypography>
            </ButtonBase>
          </Drawer> */}
      </div>
    </HeaderBar>
  );
}

export default NavBar;
