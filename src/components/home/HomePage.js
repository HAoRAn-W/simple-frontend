import React, { useEffect, useState } from "react";
import PostList from "./PostList";
import PaginationBar from "../template/PaginationBar";
import HomeCover from "./HomeCover";
import Sidebar from "./Sidebar";
import PageService from "../../app/services/page.service";
import { SUCCESSFUL } from "../../app/constants/MessageCode";

function HomePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    PageService.loadPage(currentPage - 1).then((data) => {
      if (data.code === SUCCESSFUL) {
          setPosts(data.posts);
          setTotal(data.total);
        }
    })
  }, [currentPage]);

  return (
    <>
      {currentPage === 1 && <HomeCover />}
      <div style={{ display: "flex", flexDirection: 'row' }}>
        <div style={{ flex: 7, display: 'flex', justifyContent: 'flex-end'}}>
          <PostList posts={posts}/>
        </div>
        <div style={{ flex: 3 }}>
          <Sidebar />
        </div>
      </div>
      <PaginationBar currentPage={currentPage} setCurrentPage={setCurrentPage} total={total}/>


    </>
  );
}

export default HomePage;
