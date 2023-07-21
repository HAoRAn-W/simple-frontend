import { Container, List, ListItemButton } from "@mui/material";
import React from "react";
import PostInfo from "./PostInfo";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostList({ fromEditor }) {
  const posts = useSelector((state) => state.page.posts);
  const navigate = useNavigate();

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
              style={{ marginTop: "15px" }}
              onClick={() => {
                if (fromEditor) {
                  navigate("/posteditor", {
                    state: { isNew: false, postId: post.id},
                  });
                } else {
                  navigate(`/${post.id}`);
                }
              }}
              key={post.id}
            >
              <PostInfo post={post} />
            </ListItemButton>
          );
        })}
      </List>
    </Container>
  );
}

export default PostList;
