import PaginationBar from "../PaginationBar";
import { useLocation } from "react-router-dom";
import PostList from "../home/PostList";

function CategoryPostPage() {
  const location = useLocation();
  const { id } = location.state;

  return (
    <div>
      <PostList />
      <PaginationBar pos={1} id={id} />
    </div>
  );
}

export default CategoryPostPage;
