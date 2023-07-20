import { Container, Grid, Typography } from "@mui/material";
import React from "react";

function AboutPage() {
  return (
    <>
      <Grid container minHeight={'100vh'}>
        <Grid
          item
          xs={false}
          sm={3}
          md={6}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={9} md={6}>
          <Container
            sx={{ display: "flex", flexDirection: "column", paddingTop: 4 }}
          >
            <Typography variant="h4">About me</Typography>
            <Typography variant="h5">
              Hi, My name is WHR. I built this web site with React.js and Material UI.
              If you like my post, please give me a like
            </Typography>
          </Container>
        </Grid>
      </Grid>
    </>
  );
}

export default AboutPage;
