import React, { useEffect, useState } from "react";
import TagService from "../../app/services/tag.service";
import { SUCCESSFUL } from "../../app/constants/MessageCode";
import { ButtonBase, Container, Paper, Stack, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

function TagPage() {
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    TagService.getTagList().then((data) => {
      console.log("tag lists data:", data);
      if (data.code === SUCCESSFUL) {
        setTags(data.tags);
      }
    });
  }, []);
  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        minWidth: "100%",
        backgroundImage: `url(https://i.imgur.com/O1qowWB.jpg)`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <Typography
        variant="h4"
        marginLeft={"40px"}
        marginBottom={"40px"}
        marginTop={"40px"}
      >
        Tags
      </Typography>
      <Stack
        spacing={{ xs: 1, sm: 2 }}
        direction="row"
        useFlexGap
        flexWrap="wrap"
        marginTop={2}
      >
        {tags.map((tag) => (
          <ButtonBase
            key={tag.id}
            onClick={() => {
              navigate(`/tag/${tag.id}`);
            }}
          >
            <Item sx={{ backgroundColor: "red" }}>
              <Typography>{tag.name}</Typography>
            </Item>
          </ButtonBase>
        ))}
      </Stack>
    </Container>
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
