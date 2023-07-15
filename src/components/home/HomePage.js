import React from "react";
import PostList from "./PostList";
import PaginationBar from "../PaginationBar";
import NavBar from "../NavBar";
import HomeCover from "./HomeCover";
import NameCard from "./NameCard";
import Footer from "../Footer";

function HomePage() {
  return (
    <>
      <NavBar />
      <HomeCover />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <PostList />
        <NameCard />
      </div>
      {/* <PostPage /> */}

      <PaginationBar />
      <Footer />
    </>
  );
}

export default HomePage;
