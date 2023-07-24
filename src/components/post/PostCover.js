import { Box, ButtonBase, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import UserServcice from "../../app/services/user.service";
import { IS_IN_FAVORITE } from "../../app/constants/MessageCode";

function PostCover({ post }) {
  const createdDate = new Date(post.createdTime);
  const user = localStorage.getItem("user");
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    UserServcice.queryFavorite(post.id).then((data) => {
      if (data.code === IS_IN_FAVORITE) {
        setIsFavorite(true);
      }
    });
  }, [post.id]);

  return (
    <Paper
      sx={{
        position: "relative",
        backgroundColor: "grey.800",
        mb: 4,
        backgroundSize: "cover",
        color: "whitesmoke",
        backgroundPosition: "center",
        backgroundImage: `url('https://source.unsplash.com/random?wallpapers')`,
        width: "100vw", // Set the width to the viewport width
        height: "60vh", // Set the height to the viewport height
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: "rgba(0,0,0,.4)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h2">{post.title}</Typography>
        <Typography variant="h5">{`${
          createdDate.getMonth() + 1
        }/${createdDate.getDate()}/${createdDate.getFullYear()}`}</Typography>
        {user && (
          <Box position={"absolute"} bottom={"20%"}>
            {isFavorite ? (
              <ButtonBase onClick={() => {
                UserServcice.removeFavorite(post.id);
                setIsFavorite(false);
              }}>
                <BookmarkAddedIcon fontSize="large" />
              </ButtonBase>
            ) : (
              <ButtonBase>
                <BookmarkAddIcon
                  fontSize="large"
                  onClick={() => {
                    UserServcice.addFavorite(post.id);
                    setIsFavorite(true);
                  }}
                />
              </ButtonBase>
            )}
          </Box>
        )}
      </Box>
    </Paper>
  );
}

export default PostCover;
