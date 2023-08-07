import { useNavigate } from "react-router-dom";
import {
  ButtonBase,
  Grid,
  Typography,
} from "@mui/material";
import {
  HeaderBar,
  LogoDiv,
  LogoTypography,
  SectionGrid,
  SectionTypography,
} from "../../styles/header";
import AuthService from "../../app/services/auth.service";
import UserAvatar from "./UserAvatar";

function NavBarDesktop() {
  const navigate = useNavigate();
  const user = AuthService.getUser();

  return (
    <HeaderBar>
    <LogoDiv flex={3}>
      <ButtonBase
        disableRipple
        onClick={() => {
          navigate(`/`);
        }}
      >
        <LogoTypography variant="h3">whr.one</LogoTypography>
      </ButtonBase>
    </LogoDiv>

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
        <UserAvatar user = {user}/>
      )}
    </div>
  </HeaderBar>
  );
}

export default NavBarDesktop;
