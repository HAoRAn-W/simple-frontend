import React, { useEffect, useState } from "react";
import TagService from "../../app/services/tag.service";
import { SUCCESSFUL } from "../../app/constants/MessageCode";
import { ButtonBase, Paper, Stack, Typography } from "@mui/material";
import styled from "@emotion/styled";

function TagPage() {
  const [tags, setTags] = useState([]);
  useEffect(() => {
    TagService.getTagList().then((data) => {
      console.log("tag lists data:", data);
      if (data.code === SUCCESSFUL) {
        setTags(data.tags);
      }
    });
  }, []);
  return (
    <div>
      <Stack
        spacing={{ xs: 1, sm: 2 }}
        direction="row"
        useFlexGap
        flexWrap="wrap"
        marginTop={2}
      >
        {tags.map((tag) => (
          <ButtonBase key={tag.id} onClick={() => {}}>
            <Item sx={{ backgroundColor: "red" }}>
              <Typography>{tag.name}</Typography>
            </Item>
          </ButtonBase>
        ))}
      </Stack>
    </div>
  );
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  flexGrow: 1,
}));

export default TagPage;
