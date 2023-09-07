import { Fab } from "@mui/material";
import React, { useEffect, useState } from "react";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import UserServcice from "../../app/services/user.service";
import { IS_IN_FAVORITE } from "../../app/constants/MessageCode";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";

function ActionBar({ post }) {
  const postId = post.id;

  const [isFavorite, setIsFavorite] = useState(false);
  const user = localStorage.getItem("user");

  useEffect(() => {
    UserServcice.queryFavorite(postId).then((data) => {
      if (data.code === IS_IN_FAVORITE) {
        setIsFavorite(true);
      }
    });
  }, [postId]);

  const handleClick = () => {
    if (isFavorite) {
      UserServcice.removeFavorite(postId);
      setIsFavorite(false);
    } else {
      UserServcice.addFavorite(postId);
      setIsFavorite(true);
    }
  };

  return (
    <>
      {/* <Toc markdownText={post.content}></Toc> */}
      {user && (
        <Fab
          sx={{
            position: "fixed",
            bottom: "300px",
            right: "35px",
            color: isFavorite ? "#f28482" : "grey",
            backgroundColor: "white",
          }}
          onClick={handleClick}
        >
          {isFavorite ? <BookmarkAddedIcon /> : <BookmarkAddIcon />}
        </Fab>
      )}
    </>
  );
}

export default ActionBar;
