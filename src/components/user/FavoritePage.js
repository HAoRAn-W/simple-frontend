import React, { useEffect, useState } from "react";
import UserServcice from "../../app/services/user.service";
import { SUCCESSFUL } from "../../app/constants/MessageCode";
import { ListItemButton } from "@mui/material";
import PostInfo from "../home/PostInfo";
import { useNavigate } from "react-router-dom";

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
    <div>
      {favorites.map((post) => (
        <ListItemButton
          style={{ marginTop: "15px" }}
          key={post.id}
          onClick={() => {
            navigate(`/${post.id}`);
          }}
        >
          <PostInfo post={post} />
        </ListItemButton>
      ))}
    </div>
  );
}

export default FavoritePage;
