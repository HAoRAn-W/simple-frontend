import React, { useEffect, useState } from "react";
import TagService from "../../app/services/tag.service";
import { SUCCESSFUL } from "../../app/constants/MessageCode";
import {
  Alert,
  Box,
  Button,
  ButtonBase,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";

function EditTag() {
  const [tags, setTags] = useState([]);
  const [name, setName] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [id, setId] = useState();
  const [isError, setIsError] = useState(false);

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
      <div style={{ display: "inline-block" }}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          fullWidth
          sx={{ marginTop: 5, marginBottom: 5, display: "block" }}
        />
        <Button
          variant="contained"
          onClick={() => {
            const newTag = {
              name: name,
            };
            if (isUpdate) {
              newTag.id = id;
              TagService.updateTag(newTag).then((data) => {
                if (data.code === SUCCESSFUL) {
                  setId();
                  setIsUpdate(false);
                  setName("");
                } else {
                  setIsError(true);
                }
              });
            } else {
              TagService.addTag(newTag).then((data) => {
                if (data.code === SUCCESSFUL) {
                  setId();
                  setIsUpdate(false);
                  setName("");
                } else {
                  setIsError(true);
                }
              });
            }
          }}
        >
          {isUpdate ? "Update" : "Add"}
        </Button>
        {isUpdate && (
          <>
            <Button
              variant="contained"
              onClick={() => {
                setId();
                setIsUpdate(false);
                setName("");
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                TagService.deleteTag(id).then(data => {
                  if (data.code !== SUCCESSFUL) {
                    setIsError(true);
                  }
                })
                setId();
                setIsUpdate(false);
                setName("");
              }}
            >
              Delete
            </Button>
          </>
        )}
      </div>

      {isError && <Alert severity="error" onClose={() => {
        setIsError(false)
      }}>Failed</Alert>}
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
              setName(tag.name);
              setIsUpdate(true);
              setId(tag.id);
            }}
          >
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

export default EditTag;
