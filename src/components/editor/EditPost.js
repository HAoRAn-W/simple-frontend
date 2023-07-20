import React from "react";
import PostList from "../home/PostList";
import PaginationBar from "../PaginationBar";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function EditPost() {
    const navigate = useNavigate();
  return (
    <>
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          marginTop: 20,
        }}
      >
        <Button variant="contained" onClick={() => {navigate('/posteditor')}}>Add New Post</Button>
        <PostList />
      </div>
      <PaginationBar />
    </>
  );
}

export default EditPost;
