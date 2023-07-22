import React, { useEffect } from "react";
import PostMarkdown from "./PostMarkdown";
import PostCover from "./PostCover";
import { Container, Paper } from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getpost } from "../../app/slices/post";

function PostPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post.post);

  useEffect(() => {
    dispatch(getpost({ postId: id }));
  }, [id, dispatch]);

  return (
    <div>
      <PostCover />
      <Paper elevation={0} sx={{display: 'flex', flexDirection:'column', marginX: '10%', paddingX: '20px'}} >
        <PostMarkdown content={post.content} />
      </Paper>
    </div>
  );
}

export default PostPage;
