import { Box } from "@mui/material";
import Image from "mui-image";
import React from "react";

function PostHeader({ post }) {
  return (
    <Box style={{ marginBottom: "1rem" }}>
      <Image src={post.coverUrl} style={{ height: "40vh", borderRadius: 5 }} />
    </Box>
  );
}

export default PostHeader;
