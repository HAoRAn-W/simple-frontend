import { List, ListItemButton } from "@mui/material";
import React from "react";
import PostInfo from "./PostInfo";

function PostList() {
  return (
    <List sx={{ width: "80%" }}>
      <ListItemButton>
        <PostInfo />
      </ListItemButton>
      <ListItemButton>
        <PostInfo />
      </ListItemButton>
      <ListItemButton>
        <PostInfo />
      </ListItemButton>
      <ListItemButton>
        <PostInfo />
      </ListItemButton>
      <ListItemButton>
        <PostInfo />
      </ListItemButton>
      <ListItemButton>
        <PostInfo />
      </ListItemButton>
    </List>
  );
}

export default PostList;
