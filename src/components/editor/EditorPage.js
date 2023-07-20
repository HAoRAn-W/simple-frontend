import {
  Container,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import PostList from "../home/PostList";
import PaginationBar from "../PaginationBar";
import CategoryPage from '../category/CategoryPage';

function EditorPage() {
  const [section, setSection] = useState("posts");
  const handleChange = (event, newSection) => {
    setSection(newSection);
  };
  const control = {
    value: section,
    onChange: handleChange,
    exclusive: true,
  };
  return (
    <>
      <Container
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <ToggleButtonGroup {...control} sx={{ marginTop: 6 }}>
          <ToggleButton value={"posts"} key="posts">
            <Typography>post</Typography>
          </ToggleButton>
          <ToggleButton value={"categories"} key="categories">
            <Typography>categories</Typography>
          </ToggleButton>
          <ToggleButton value={"tags"} key="tags">
            <Typography>tags</Typography>
          </ToggleButton>
        </ToggleButtonGroup>
        <div>
          {section === "posts" ? (
            <>
              <div style={{ height: "100vh" }}>
                <PostList />
              </div>
              <PaginationBar />
            </>
          ) : section === "categories" ? (
            <div><CategoryPage/></div>
          ) : (
            <div>tags</div>
          )}
        </div>
      </Container>
    </>
  );
}

export default EditorPage;
