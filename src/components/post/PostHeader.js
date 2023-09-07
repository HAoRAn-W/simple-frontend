import { Typography } from "@mui/material";
import Image from "mui-image";
import React from "react";

function PostHeader({ post }) {
  const createdDate = new Date(post.createdTime);

  return (
    <div style={{ marginBottom: "1rem" }}>
      <Image
        src={post.coverUrl}
        style={{ height: "50vh", borderRadius: 20, marginBottom: "1rem" }}
      />
      <Typography
        variant="h2"
        style={{ wordWrap: "break-word", color: "#343a40" }}
      >
        {post.title}
      </Typography>
      <Typography variant="h5" gutterBottom>{`${
        createdDate.getMonth() + 1
      }/${createdDate.getDate()}/${createdDate.getFullYear()}`}</Typography>
    </div>
  );
}

export default PostHeader;
