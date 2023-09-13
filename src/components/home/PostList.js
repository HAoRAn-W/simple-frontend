import { List, ListItemButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PostCard from "./PostCard";

function PostList({ posts, fromEditor = false }) {
  const navigate = useNavigate();

  const handleClick = (post) => {
    if (fromEditor) {
      navigate("/posteditor", {
        state: { isNew: false, postId: post.id },
      });
    } else {
      navigate(`/post/${post.id}`);
    }
  };

  return (
    <>
      {posts.length === 0 ? (
        <div>
          <Typography variant="h4">No Posts</Typography>
        </div>
      ) : (
        <List disablePadding sx={{ width: { md: "100%", xs: "90%" } }}>
          {posts.map((post) => {
            return (
              <ListItemButton
                style={{ backgroundColor: "transparent" }}
                onClick={() => handleClick(post)}
                key={post.id}
              >
                <PostCard post={post} />
              </ListItemButton>
            );
          })}
        </List>
      )}
    </>
  );
}

export default PostList;
