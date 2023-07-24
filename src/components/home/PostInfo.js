import { Box, Card, CardContent, CardMedia, Container, Typography } from "@mui/material";
import React from "react";

// Basic post info showed on home page
function PostInfo({ post }) {
  const date = new Date(post.createdTime);

  return (
    <Card sx={{ display: "flex", width: "100%" }}>
      <CardMedia
        component="img"
        sx={{ width: 200 }}
        image="https://source.unsplash.com/random?wallpapers"
        alt="Cover picture"
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography variant="h5">{post.title}</Typography>
          <Container sx={{ display: "flex", justifyContent: "space-between"}}>
            <Typography>{`${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`}</Typography>
            <Typography> {post.category.name} </Typography>
          </Container>
          <Typography>{post.description}</Typography>
        </CardContent>
      </Box>
    </Card>
  );
}

export default PostInfo;
