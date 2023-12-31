import { Divider, Paper, Typography } from "@mui/material";
import Image from "mui-image";
import React from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";
import { PostCardImageDiv, PostCardTextDiv } from "../../styles/home";

function PostCard({ post }) {
  const date = new Date(post.createdTime);
  return (
    <Paper
      style={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        maxHeight: 260,
        width: "100%",
      }}
    >
      <PostCardImageDiv>
        <Image src={post.coverUrl} />
      </PostCardImageDiv>

      <PostCardTextDiv>
        <Typography
          variant="h5"
          gutterBottom
          style={{ wordBreak: "break-all", maxWidth: "100%" }}
        >
          {post.title}
        </Typography>

        <Divider />

        <Typography
          variant="subtitle1"
          color={"grey"}
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {post.description}
        </Typography>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "auto",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row" }}>
            <CalendarMonthIcon />
            <Typography
              variant="body1"
              gutterBottom
              marginLeft={1}
              marginRight={2}
            >{`${
              date.getMonth() + 1
            }/${date.getDate()}/${date.getFullYear()}`}</Typography>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <InboxOutlinedIcon />
            <Typography variant="body1" gutterBottom marginLeft={1}>
              {post.category.name}
            </Typography>
          </div>
        </div>
      </PostCardTextDiv>
    </Paper>
  );
}

export default PostCard;
