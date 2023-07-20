import React, { useEffect, useState } from "react";
import PostMarkdown from "./PostMarkdown";
import PostCover from "./PostCover";
import { Container } from "@mui/material";
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
      <Container>
        <PostMarkdown content={post.content}/>
      </Container>
    </div>
  );
}

export default PostPage;
