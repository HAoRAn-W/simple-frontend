import { Divider, Paper, Typography } from "@mui/material";
import Image from "mui-image";
import React from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";

function PostCard({ post }) {
  const date = new Date(post.createdTime);
  return (
    <Paper
      style={{
        display: "flex",
        flexDirection: "row",
        height: 260,
        width: "100%",
      }}
    >
      <div style={{ flex: 5 }}>
        <Image src={post.coverUrl} />
      </div>
      <div
        style={{
          flex: 7,
          display: "flex",
          flexDirection: "column",
          padding: 20,
        }}
      >
        <Typography variant="h5" gutterBottom  style={{ wordBreak:'break-all', maxWidth: '100%'}}>
          {post.title}
        </Typography>

        <Divider />
        <Typography
          variant="subtitle1"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {post.description}
        </Typography>
        <div
          style={{ display: "flex", flexDirection: "row", marginTop: "auto" }}
        >
          <CalendarMonthIcon />
          <Typography
            variant="subtitle1"
            gutterBottom
            fontFamily={"Roboto"}
            marginLeft={1}
            marginRight={2}
          >{`${
            date.getMonth() + 1
          }/${date.getDate()}/${date.getFullYear()}`}</Typography>

          <InboxOutlinedIcon />
          <Typography
            variant="subtitle1"
            fontFamily={"Roboto"}
            gutterBottom
            marginLeft={1}
          >
            {post.category.name}
          </Typography>
        </div>
      </div>
    </Paper>
  );
}

export default PostCard;
