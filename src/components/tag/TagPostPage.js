import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import PageService from '../../app/services/page.service';
import { SUCCESSFUL } from '../../app/constants/MessageCode';
import PostList from '../home/PostList';
import PaginationBar from '../template/PaginationBar';

function TagPostPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [posts, setPosts] = useState([]);
    const [total, setTotal] = useState(0);
  
    const {id} = useParams();
  
    useEffect(() => {
      PageService.loadPageByTag(id, currentPage - 1).then((data) => {
        if (data.code === SUCCESSFUL) {
            setPosts(data.posts);
            setTotal(data.total);
          }
      })
    }, [currentPage, id]);

  return (
     <div style={{width: '80%', display: 'flex', flexDirection: 'column',alignItems: 'center', justifyContent: 'center'}}>
      <PostList posts={posts} />
      <PaginationBar currentPage={currentPage} setCurrentPage={setCurrentPage} total={total}/>

    </div>
  )
}

export default TagPostPage
