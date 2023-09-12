import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { ButtonBase, MenuItem, Popover, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function DrawerButton() {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleClick = (dest) => {
    setAnchorElUser(null);
    navigate(`/${dest}`);
  };

  return (
    <>
      <ButtonBase sx={{ marginRight: 3 }} onClick={handleOpenUserMenu}>
        <FontAwesomeIcon icon={faBars} style={{ height: 25 }} />
      </ButtonBase>
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
        <MenuItem onClick={() => handleClick("category")}>
          <Typography textAlign="center">Category</Typography>
        </MenuItem>
        <MenuItem onClick={() => handleClick("tag")}>
          <Typography textAlign="center">Tag</Typography>
        </MenuItem>
        <MenuItem onClick={() => handleClick("about")}>
          <Typography textAlign="center">About</Typography>
        </MenuItem>
      </Popover>
    </>
  );
}

export default DrawerButton;
