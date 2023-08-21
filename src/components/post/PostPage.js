import React, { useEffect, useState } from "react";
import PostMarkdown from "./PostMarkdown";
import PostCover from "./PostCover";
import { Paper } from "@mui/material";
import { useParams } from "react-router-dom";
import PostService from "../../app/services/post.service";
import { SUCCESSFUL } from "../../app/constants/MessageCode";
import ActionBar from "./ActionBar";
import PostHeader from "./PostHeader";

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
      
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          marginX: "10%",
          padding: 5
        }}
        elevation={0}
      >
        <PostHeader post={post} />
        <PostMarkdown content={post.content} />
      </Paper>
      <ActionBar post={post}/>
    </div>
  );
}

export default PostPage;
