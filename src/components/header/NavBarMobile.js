import React from "react";
import { HeaderBar, LogoDiv, LogoTypography } from "../../styles/header";
import { ButtonBase, Grid, Typography } from "@mui/material";
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
        <UserAvatar user={user} />
      )}
    </HeaderBar>
  );
}

export default NavBarMobile;
