import { Container, List, ListItemButton } from "@mui/material";
import React from "react";
import PostInfo from "./PostInfo";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function PostList() {
  const posts = useSelector((state) => state.page.posts);
  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
      }}
    >
      <List sx={{ width: "90%" }} disablePadding>
        {posts.map((post) => {
          return (
            <ListItemButton
              style={{ marginTop: "15px"}}
              component={Link}
              to={`/${post.id}`}
              key={post.id}
            >
              <PostInfo post={post}/>
            </ListItemButton>
          );
        })}

      </List>
    </Container>
  );
}

export default PostList;
