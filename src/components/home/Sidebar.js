import { Grid } from "@mui/material";
import React from "react";
import NameCard from "./NameCard";
import PinBoard from "./PinBoard";
import MuseumShuffle from "./MuseumShuffle";

function Sidebar() {
  return (
    <Grid container spacing={2} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <Grid item >
        <NameCard />
      </Grid>
      <Grid item >
        <PinBoard />
      </Grid>
      <Grid item >
        <MuseumShuffle />
      </Grid>
    </Grid>
  );
}

export default Sidebar;
