import { Grid } from "@mui/material";
import React from "react";
import NameCard from "./NameCard";
import PinBoard from "./PinBoard";

function Sidebar() {
  return (
    <Grid
      container
      spacing={5}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
    >
      <Grid item>
        <NameCard />
      </Grid>

      <Grid item>
        <PinBoard />
      </Grid>
    </Grid>
  );
}

export default Sidebar;
