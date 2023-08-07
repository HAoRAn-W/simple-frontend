import React, { useEffect, useState } from "react";
import UserServcice from "../../app/services/user.service";
import { SUCCESSFUL } from "../../app/constants/MessageCode";
import { ListItemButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PostCard from "../home/PostCard";
import PaginationBar from "../template/PaginationBar";

function FavoritePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    UserServcice.getFavoriteList(currentPage - 1).then((data) => {
      if (data.code === SUCCESSFUL) {
        setFavorites(data.posts);
        setTotal(data.total);
      }
    });
  }, [currentPage]);

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      {favorites.map((post) => (
        <ListItemButton
          style={{ marginTop: "15px", width: '60%' }}
          key={post.id}
          onClick={() => {
            navigate(`/post/${post.id}`);
          }}
        >
          <PostCard post={post} />
        </ListItemButton>
      ))}
      <PaginationBar currentPage={currentPage} setCurrentPage={setCurrentPage} total={total}/>

    </div>
  );
}

export default FavoritePage;
