import { Container, List, ListItemButton } from "@mui/material";
import React from "react";
import PostInfo from "./PostInfo";
import { Link } from "react-router-dom";

function PostList() {
  return (
    <Container
      style={{
        display: "flex",
        flexDirection: 'column',
        alignItems: 'flex-end'
      }}
    >
      {/* <Typography variant="h4" marginTop={'20px'}>Posts</Typography> */}
      <List sx={{ width: "90%" }} disablePadding>
        <ListItemButton style={{ marginTop: "15px" }} component={Link} to='/1'>
          <PostInfo />
        </ListItemButton>
        <ListItemButton style={{ marginTop: "15px" }}>
          <PostInfo />
        </ListItemButton>
        <ListItemButton style={{ marginTop: "15px" }}>
          <PostInfo />
        </ListItemButton>
        <ListItemButton style={{ marginTop: "15px" }}>
          <PostInfo />
        </ListItemButton>
      </List>
    </Container>
  );
}

export default PostList;
