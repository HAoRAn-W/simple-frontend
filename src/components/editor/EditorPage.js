import { Container, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";

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
    <Container sx={{display: 'flex', flexDirection:'column', alignItems: 'center'}}>
    <ToggleButtonGroup {...control} sx={{marginTop: 6}}>
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
    </Container>
      
    </>
  );
}

export default EditorPage;
