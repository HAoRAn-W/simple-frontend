import React from "react";
import PostList from "./PostList";
import PaginationBar from "../PaginationBar";
import HomeCover from "./HomeCover";
import Sidebar from "./Sidebar";

function HomePage() {
  return (
    <>
      <HomeCover />
      <div style={{ display: "flex", flexDirection: 'row' }}>
        <div style={{ flex: 7}}>
          <PostList />
        </div>
        <div style={{ flex: 3 }}>
          <Sidebar />
        </div>
      </div>
      <PaginationBar />


    </>
  );
}

export default HomePage;
