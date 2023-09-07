import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import {
  Box,
  ButtonBase,
  Drawer,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function DrawerButton() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (isOpen) => {
    setOpen(isOpen);
  };

  const handleClick = (dest) => {
    navigate(`/${dest}`);
    setOpen(false);
  };

  return (
    <>
      <ButtonBase
        sx={{ marginRight: 3 }}
        onClick={() => {
          toggleDrawer(true);
        }}
      >
        <FontAwesomeIcon icon={faBars} style={{ height: 25 }} />
      </ButtonBase>

      <Drawer anchor="left" open={open} onClose={() => toggleDrawer(false)}>
        <Box
          sx={{ width: "25vw", paddingTop: "2rem" }}
          onClick={() => toggleDrawer(false)}
        >
          <List sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <ListItem disablePadding sx={{ justifyContent: "center" }}>
              <ButtonBase disableRipple>
                <Typography
                  fontWeight={"bold"}
                  fontSize={"1.5rem"}
                  onClick={() => {
                    handleClick("category");
                  }}
                >
                  CATEGORY
                </Typography>
              </ButtonBase>
            </ListItem>
            <ListItem disablePadding sx={{ justifyContent: "center" }}>
              <ButtonBase disableRipple>
                <Typography
                  fontWeight={"bold"}
                  fontSize={"1.5rem"}
                  onClick={() => {
                    handleClick("tag");
                  }}
                >
                  TAG
                </Typography>
              </ButtonBase>
            </ListItem>
            <ListItem disablePadding sx={{ justifyContent: "center" }}>
              <ButtonBase disableRipple>
                <Typography
                  fontWeight={"bold"}
                  fontSize={"1.5rem"}
                  onClick={() => {
                    handleClick("about");
                  }}
                >
                  ABOUT
                </Typography>
              </ButtonBase>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default DrawerButton;
