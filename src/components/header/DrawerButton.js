import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { ButtonBase, Drawer, Grid, Typography } from "@mui/material";
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
        <Grid
          container
          sx={{
            marginX: 3,
            display: "flex",
            flexDirection: "column",
            marginTop: 3,
          }}
          spacing={1}
        >
          <Grid item>
            <ButtonBase disableRipple>
              <Typography
                onClick={() => {
                  handleClick("category");
                }}
              >
                CATEGORY
              </Typography>
            </ButtonBase>
          </Grid>

          <Grid item>
            <ButtonBase disableRipple>
              <Typography
                onClick={() => {
                  handleClick("tag");
                }}
              >
                TAG
              </Typography>
            </ButtonBase>
          </Grid>

          <Grid item>
            <ButtonBase disableRipple>
              <Typography
                onClick={() => {
                  handleClick("about");
                }}
              >
                ABOUT
              </Typography>
            </ButtonBase>
          </Grid>
        </Grid>
      </Drawer>
    </>
  );
}

export default DrawerButton;
