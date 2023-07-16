import React from "react";
import PostList from "./PostList";
import PaginationBar from "../PaginationBar";
import HomeCover from "./HomeCover";
import Sidebar from "./Sidebar";

function HomePage() {
  return (
    <>
      <HomeCover />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ display: "flex", width: "70%" }}>
          <PostList />
        </div>
        <div style={{ display: "flex", width: "30%" }}>
          <Sidebar />
        </div>
      </div>
      <PaginationBar />


    </>
  );
}

export default HomePage;
