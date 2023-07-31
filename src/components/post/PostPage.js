import React, { useEffect, useState } from "react";
import PostMarkdown from "./PostMarkdown";
import PostCover from "./PostCover";
import { Paper } from "@mui/material";
import { useParams } from "react-router-dom";
import PostService from "../../app/services/post.service";
import { SUCCESSFUL } from "../../app/constants/MessageCode";

function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    PostService.getPost(id).then((data) => {
      if (data.code === SUCCESSFUL) {
        setPost(data.post);
      }
    });
  }, [id]);

  return (
    <div>
      <PostCover post={post} />
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          flexDirection: "column",
          marginX: "18%",
        }}
      >
        <PostMarkdown content={post.content} />
      </Paper>
    </div>
  );
}

export default PostPage;
