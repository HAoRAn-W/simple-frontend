import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";

// Basic post info showed on home page
function PostInfo() {

  return (

      <Card sx={{ display: "flex"}} >
        <CardMedia
          component="img"
          sx={{ width: 200 }}
          image="https://source.unsplash.com/random?wallpapers"
          alt="Cover picture"
        />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography variant="h5">Post Title</Typography>
            <DataLine />
            <Typography>
              Post Introduction, this is a post intropuction: today I go out ith
              my girlfriend and we eat hot pot and watch movie. I love my
              girlfriend
            </Typography>
          </CardContent>
        </Box>
      </Card>
  );
}

const DataLine = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Typography>Jul 18 </Typography>
      <Typography> Java </Typography>
      <Typography> Views: 123 </Typography>
    </Box>
  );
};
export default PostInfo;
