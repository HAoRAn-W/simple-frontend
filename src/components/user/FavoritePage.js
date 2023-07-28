import React, { useEffect, useState } from "react";
import UserServcice from "../../app/services/user.service";
import { SUCCESSFUL } from "../../app/constants/MessageCode";
import { ListItemButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PostCard from "../home/PostCard";

function FavoritePage() {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    UserServcice.getFavoriteList().then((data) => {
      if (data.code === SUCCESSFUL) {
        setFavorites(data.favorites);
      }
    });
  }, []);

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      {favorites.map((post) => (
        <ListItemButton
          style={{ marginTop: "15px", width: '60%' }}
          key={post.id}
          onClick={() => {
            navigate(`/${post.id}`);
          }}
        >
          <PostCard post={post} />
        </ListItemButton>
      ))}
    </div>
  );
}

export default FavoritePage;
