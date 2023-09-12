import React, { useEffect, useState } from "react";
import PostList from "./PostList";
import PaginationBar from "../pagination/PaginationBar";
import HomeCover from "./HomeCover";
import PageService from "../../app/services/page.service";
import { SUCCESSFUL } from "../../app/constants/MessageCode";
import { MainDiv, PostListDiv, SidebarDiv } from "../../styles/home";
import NameCard from "./NameCard";
import PinBoard from "./PinBoard";
import MuseumShuffle from "./MuseumShuffle";

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
    });
  }, [currentPage]);

  return (
    <>
      {currentPage === 1 && <HomeCover />}
      <MainDiv>
        <PostListDiv>
          <PostList posts={posts} />
          <PaginationBar
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            total={total}
          />
        </PostListDiv>

        <SidebarDiv>
          <NameCard />
          <PinBoard />
          <MuseumShuffle />
        </SidebarDiv>
      </MainDiv>
    </>
  );
}

export default HomePage;
