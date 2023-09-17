import React, { useState } from "react";
import {
  ButtonBase,
  MenuItem,
  Popover,
  Tooltip,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Image from "mui-image";
import AuthService from "../../app/services/auth.service";

function UserAvatar({ user }) {
  const navigate = useNavigate();
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
    AuthService.logout();
    navigate("/");
  };
  return (
    <>
      <Tooltip title="User menu">
        <ButtonBase onClick={handleOpenUserMenu} sx={{ borderRadius: "50%" }}>
          <Image
            src={user.avatar ? user.avatar.url : "./avatars/cloud.jpg"}
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "50%",
            }}
            alt="avatar"
          />
        </ButtonBase>
      </Tooltip>

      <Popover
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
      </Popover>
    </>
  );
}

export default UserAvatar;
