import {
  Avatar,
  Box,
  ButtonBase,
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

  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleClickUserMenu = () => {
    setAnchorElUser(null);
    navigate(`login`);
  };

  useEffect(() => {
    setValue(path);
  }, [path]);

  const handleClick = () => {
    navigate(`/`);
    setValue((prev) => "");
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
        <Tabs value={value} onChange={handleChange}>
          <Tab disableRipple value="category" label="Category" />
          <Tab disableRipple value="tag" label="Tag" />
          <Tab disableRipple value="about" label="About" />
        </Tabs>
      </Box>
      <Box>
        <Tooltip title="User menu">
          <IconButton onClick={handleOpenUserMenu}>
            <Avatar sx={{ bgcolor: "black" }}>W</Avatar>
          </IconButton>
        </Tooltip>
        <Menu
        sx={{ mt: '45px' }}
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
          <Typography textAlign="center">
              favorite
            </Typography>
          </MenuItem>
          <MenuItem onClick={handleClickUserMenu}>
          <Typography textAlign="center">
              log in
            </Typography>
          </MenuItem>
          <MenuItem onClick={handleCloseUserMenu}>
          <Typography textAlign="center">
              log out
            </Typography>
          </MenuItem>
        </Menu>
      </Box>
    </Toolbar>
  );
}

export default NavBar;
