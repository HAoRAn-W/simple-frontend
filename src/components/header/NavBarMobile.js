import React from "react";
import { HeaderBar, LogoDiv, LogoTypography } from "../../styles/header";
import { ButtonBase, Typography } from "@mui/material";
import UserAvatar from "./UserAvatar";
import AuthService from "../../app/services/auth.service";
import { useNavigate } from "react-router-dom";
import DrawerButton from "./DrawerButton";

function NavBarMobile() {
  const user = AuthService.getUser();
  const navigate = useNavigate();
  return (
    <HeaderBar>
      <DrawerButton />
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
      <UserAvatar user={user} />
    </HeaderBar>
  );
}

export default NavBarMobile;
