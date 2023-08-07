import { useMediaQuery } from "@mui/material";

import NavBarMobile from "./NavBarMobile";
import NavBarDesktop from "./NavBarDesktop";

function NavBar() {
  const isMediumUpScreen = useMediaQuery((theme) => theme.breakpoints.up("md"));
  return isMediumUpScreen ? <NavBarDesktop /> : <NavBarMobile />;
}

export default NavBar;
