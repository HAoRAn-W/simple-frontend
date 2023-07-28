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
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          marginTop: 20,
        }}
      >
        <Button
          variant="contained"
          onClick={() => {
            navigate("/posteditor", { state: { isNew: true} });
          }}
        >
          Add New Post
        </Button>
        <PostList fromEditor={true} />
      </div>
      <PaginationBar />
    </>
  );
}

export default EditPost;
