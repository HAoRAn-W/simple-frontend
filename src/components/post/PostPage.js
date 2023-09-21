import React, { useEffect, useState } from "react";
import PostMarkdown from "./PostMarkdown";
import { Box, ButtonBase, Paper, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import PostService from "../../app/services/post.service";
import { IS_IN_FAVORITE, SUCCESSFUL } from "../../app/constants/MessageCode";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PostHeader from "./PostHeader";
import UserServcice from "../../app/services/user.service";

function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [isFavorite, setIsFavorite] = useState(false);
  const user = localStorage.getItem("user");

  const createdDate = new Date(post.createdTime);

  useEffect(() => {
    PostService.getPost(id).then((data) => {
      if (data.code === SUCCESSFUL) {
        setPost(data.post);
      }
    });

    UserServcice.queryFavorite(id).then((data) => {
      if (data.code === IS_IN_FAVORITE) {
        setIsFavorite(true);
      }
    });
  }, [id]);

  const handleClick = () => {
    if (isFavorite) {
      UserServcice.removeFavorite(id);
      setIsFavorite(false);
    } else {
      UserServcice.addFavorite(id);
      setIsFavorite(true);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        paddingX: { xs: 3, sm: 0 },
      }}
      elevation={0}
    >
      <PostHeader post={post} />
      <Paper sx={{ paddingX: { sm: 2, md: 10 } }} elevation={0}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Typography
            variant="h2"
            style={{ wordWrap: "break-word", color: "#343a40" }}
          >
            {post.title}
          </Typography>

          {user && (
            <ButtonBase
              disableRipple
              onClick={handleClick}
              sx={{
                color: isFavorite ? "#f28482" : "grey",
                backgroundColor: "white",
                marginLeft: "1rem",
              }}
            >
              <FavoriteIcon fontSize="large" />
            </ButtonBase>
          )}
        </div>
        <Typography variant="h5">{`${
          createdDate.getMonth() + 1
        }/${createdDate.getDate()}/${createdDate.getFullYear()}`}</Typography>

        <PostMarkdown content={post.content} />
      </Paper>
    </Box>
  );
}

export default PostPage;
