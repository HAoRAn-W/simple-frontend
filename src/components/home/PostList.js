import { List, ListItemButton, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PostCard from "./PostCard";

function PostList({ fromEditor }) {
  const posts = useSelector((state) => state.page.posts);
  const navigate = useNavigate();

  return (
    <>
      {posts.length === 0 ? (
        <Typography variant="h4">No Posts</Typography>
      ) : (
        <List sx={{ width: "90%" }} disablePadding>
          {posts.map((post) => {
            return (
              <ListItemButton
                style={{ marginTop: "15px" }}
                onClick={() => {
                  if (fromEditor) {
                    navigate("/posteditor", {
                      state: { isNew: false, postId: post.id },
                    });
                  } else {
                    navigate(`/${post.id}`);
                  }
                }}
                key={post.id}
              >
                <PostCard post={post} />
              </ListItemButton>
            );
          })}
        </List>
      )}
      </>
  );
}

export default PostList;
