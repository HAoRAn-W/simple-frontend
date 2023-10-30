import React, { useEffect, useState } from "react";
import PostList from "../home/PostList";
import PaginationBar from "../pagination/PaginationBar";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PageService from "../../app/services/page.service";
import { SUCCESSFUL } from "../../app/constants/MessageCode";

function EditPost() {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    PageService.loadPage(currentPage - 1).then((data) => {
      if (data.code === SUCCESSFUL) {
        setPosts(data.posts);
        setTotal(data.total);
      }
    });
  }, [currentPage]);

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
            navigate("/posteditor", { state: { isNew: true } });
          }}
        >
          Add New Post
        </Button>
        <PostList posts={posts} fromEditor={true} />
      </div>
      <PaginationBar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        total={total}
      />
    </>
  );
}

export default EditPost;
