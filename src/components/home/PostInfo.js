import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";
import React from "react";

// Basic post info showed on home page
function PostInfo({ post }) {
  const date = new Date(post.createdTime);

  return (
    <Card sx={{ display: "flex", width: "100%" }}>
      <CardMedia
        component="img"
        sx={{ width: 400 }}
        image={post.coverUrl}
        alt="Cover picture"
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <CardContent>
          <Typography variant="h5" fontFamily={"Roboto"} gutterBottom>
            {post.title}
          </Typography>
          <div style={{ display: "flex", paddingLeft: "0px" }}>
            <div
              style={{ display: "flex", flexDirection: "row", paddingLeft: "0px" }}
            >
              <CalendarMonthIcon />
              <Typography
                gutterBottom
                marginLeft={1}
                marginRight={2}
                variant="subtitle1"
              >{`${
                date.getMonth() + 1
              }/${date.getDate()}/${date.getFullYear()}`}</Typography>

              <InboxOutlinedIcon />
              <Typography variant="subtitle1" marginLeft={1}>
                {post.category.name}
              </Typography>
            </div>
          </div>
          <Typography variant="subtitle1">{post.description}</Typography>
        </CardContent>
      </Box>
    </Card>
  );
}

export default PostInfo;
