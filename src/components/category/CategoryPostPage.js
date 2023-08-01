import PaginationBar from "../PaginationBar";
import { useParams } from "react-router-dom";
import PostList from "../home/PostList";
import { useEffect, useState } from "react";
import PageService from "../../app/services/page.service";
import { SUCCESSFUL } from "../../app/constants/MessageCode";

function CategoryPostPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState(0);

  const {id} = useParams();

  useEffect(() => {
    PageService.loadPageByCategory(id, currentPage - 1).then((data) => {
      console.log('data:', data)  
      if (data.code === SUCCESSFUL) {
          setPosts(data.posts);
          setTotal(data.total);
        }
    })
  }, [currentPage, id]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column',alignItems: 'center', justifyContent: 'center', marginLeft: 260, marginRight: 260}}>
      <PostList posts={posts} />
      <PaginationBar currentPage={currentPage} setCurrentPage={setCurrentPage} total={total}/>
    </div>
  );
}

export default CategoryPostPage;
