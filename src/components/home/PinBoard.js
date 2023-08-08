import { Card, CardContent, ListItemButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import PostService from "../../app/services/post.service";
import { SUCCESSFUL } from "../../app/constants/MessageCode";
import { useNavigate } from "react-router-dom";

function PinBoard() {
  const navigate = useNavigate();
  const [pinnedPosts, setPinnedPosts] = useState([]);

  useEffect(() => {
    PostService.getPinnedPosts().then((data) => {
      if (data.code === SUCCESSFUL) {
        setPinnedPosts(data.posts);
      }
    });
  }, []);
  return (
    <Card sx={{ width: '80%' }}>
      <CardContent>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" component="div" color={"grey"}>
            <b>Pinned Posts</b>
          </Typography>
        </div>
        {pinnedPosts.map((post) => {
          return (
            <ListItemButton
              sx={{ paddingLeft: 0 }}
              key={post.id}
              onClick={() => {
                navigate(`/post/${post.id}`);
              }}
            >
              <Typography style={{ wordBreak: "break-all" }}>
                {post.title}
              </Typography>
            </ListItemButton>
          );
        })}
      </CardContent>
    </Card>
  );
}

export default PinBoard;
