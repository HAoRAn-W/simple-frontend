import {
  Container,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import EditPost from "./EditPost";
import EditCategory from "./EditCategory";
import EditTag from "./EditTag";
import EditAvatar from "./EditAvatar";

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
        <ToggleButton value={"avatar"} key="avatar">
          <Typography>avatar</Typography>
        </ToggleButton>
      </ToggleButtonGroup>
      {(() => {
        switch (section) {
          case "posts":
            return <EditPost />;
          case "categories":
            return <EditCategory />;
          case "tags":
            return <EditTag />;
          case "avatar":
            return <EditAvatar />;
          default:
            return null;
        }
      })()}
    </Container>
  );
}

export default EditorPage;
