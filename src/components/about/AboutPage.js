import { Container, Grid, Typography } from "@mui/material";
import Image from "mui-image";
import React from "react";

function AboutPage() {
  return (
    <Container>
      <Grid
        container
        sx={{ display: "flex", flexDirection: "column", paddingX: 5 }}
      >
        <Grid item display="flex" justifyContent={"center"}>
          <Typography variant="h2" gutterBottom>
            About Me
          </Typography>
        </Grid>
        <Grid item>
          <Grid
            container
            sx={{ display: "flex", flexDirection: { xs: "column", lg: "row" } }}
            spacing={4}
          >
            <Grid
              item
              flex={5}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Image src="https://i.imgur.com/wMO9AqS.jpg" />
            </Grid>
            <Grid
              item
              flex={8}
              display="flex"
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam
                in arcu cursus euismod quis viverra nibh cras. Elementum
                sagittis vitae et leo duis. In hac habitasse platea dictumst
                vestibulum. A diam sollicitudin tempor id eu nisl nunc. Et
                malesuada fames ac turpis egestas maecenas pharetra. Massa
                tempor nec feugiat nisl pretium. Ut eu sem integer vitae. Id leo
                in vitae turpis massa sed elementum tempus egestas. Sed
                adipiscing diam donec adipiscing tristique risus nec feugiat in.
                Sit amet cursus sit amet. Nec ultrices dui sapien eget mi proin.
                Mattis enim ut tellus elementum sagittis vitae et leo duis.
                Tortor pretium viverra suspendisse potenti nullam ac tortor
                vitae purus. Egestas dui id ornare arcu odio ut sem nulla
                pharetra. Purus ut faucibus pulvinar elementum integer. Bibendum
                at varius vel pharetra. In iaculis nunc sed augue lacus viverra
                vitae congue. Id leo in vitae turpis massa sed elementum.
                Tristique risus nec feugiat in. Mi proin sed libero enim sed
                faucibus turpis in. In hac habitasse platea dictumst vestibulum
                rhoncus est. Nibh nisl condimentum id venenatis a. Blandit massa
                enim nec dui nunc mattis enim ut. Integer eget aliquet nibh
                praesent tristique magna sit amet. Diam quam nulla porttitor
                massa id neque.
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item display="flex" justifyContent={"center"}>
          <Typography variant="h2" gutterBottom marginTop={5}>
            What I'm doing
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1" sx={{ wordBreak: "break-word" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam in
            arcu cursus euismod quis viverra nibh cras. Elementum sagittis vitae
            et leo duis. In hac habitasse platea dictumst vestibulum. A diam
            sollicitudin tempor id eu nisl nunc. Et malesuada fames ac turpis
            egestas maecenas pharetra. Massa tempor nec feugiat nisl pretium. Ut
            eu sem integer vitae. Id leo in vitae turpis massa sed elementum
            tempus egestas. Sed adipiscing diam donec adipiscing tristique risus
            nec feugiat in. Sit amet cursus sit amet. Nec ultrices dui sapien
            eget mi proin. Mattis enim ut tellus elementum sagittis vitae et leo
            duis. Tortor pretium viverra suspendisse potenti nullam ac tortor
            vitae purus. Egestas dui id ornare arcu odio ut sem nulla pharetra.
            Purus ut faucibus pulvinar elementum integer. Bibendum at varius vel
            pharetra. In iaculis nunc sed augue lacus viverra vitae congue. Id
            leo in vitae turpis massa sed elementum. Tristique risus nec feugiat
            in. Mi proin sed libero enim sed faucibus turpis in. In hac
            habitasse platea dictumst vestibulum rhoncus est. Nibh nisl
            condimentum id venenatis a. Blandit massa enim nec dui nunc mattis
            enim ut. Integer eget aliquet nibh praesent tristique magna sit
            amet. Diam quam nulla porttitor massa id neque.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}

export default AboutPage;
