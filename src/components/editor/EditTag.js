import React, { useEffect, useRef, useState } from "react";
import TagService from "../../app/services/tag.service";
import { SUCCESSFUL } from "../../app/constants/MessageCode";
import {
  Alert,
  Box,
  Button,
  ButtonBase,
  Container,
  Dialog,
  DialogActions,
  DialogTitle,
  Input,
  InputLabel,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";

function EditTag() {
  const [tags, setTags] = useState([]);
  const name = useRef(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [id, setId] = useState();
  const [isError, setIsError] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);

  const handleCancelDialog = () => {
    setOpenDialog(false);
  };

  const handleDelete = () => {
    TagService.deleteTag(id).then(() => {
      updateTags()
    });
    setOpenDialog(false);
    name.current.value = "";
    setIsUpdate(false);
    setId();
  };

  const updateTags = () => {
    TagService.getTagList().then((data) => {
      if (data.code === SUCCESSFUL) {
        setTags(data.tags);
      }
    });
  }

  useEffect(() => {
    TagService.getTagList().then((data) => {
      if (data.code === SUCCESSFUL) {
        setTags(data.tags);
      }
    });
  }, []);

  return (
    <div style={{ height: "100vh" }}>
      <Container>
        <form>
          <InputLabel htmlFor="name">Name</InputLabel>
          <Input id="name" inputRef={name} fullWidth sx={{ marginBottom: 4 }} />
        </form>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            sx={{ marginX: "10px" }}
            variant="contained"
            onClick={() => {
              const newTag = {
                name: name.current.value,
              };
              if (isUpdate) {
                newTag.id = id;
                TagService.updateTag(newTag).then((data) => {
                  if (data.code === SUCCESSFUL) {
                    setId();
                    setIsUpdate(false);
                    name.current.value = "";
                    updateTags()
                  } else {
                    setIsError(true);
                  }
                });
              } else {
                TagService.addTag(newTag).then((data) => {
                  if (data.code === SUCCESSFUL) {
                    setId();
                    setIsUpdate(false);
                    name.current.value = "";
                    updateTags()
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
                sx={{ marginX: "10px" }}
                variant="contained"
                onClick={() => {
                  setId();
                  setIsUpdate(false);
                  name.current.value = "";
                }}
              >
                Cancel
              </Button>
              <Button
                sx={{
                  marginX: "10px",
                  backgroundColor: "#ef233c",
                  color: "white",
                }}
                variant="contained"
                onClick={() => {
                  setOpenDialog(true);
                }}
              >
                Delete
              </Button>
            </>
          )}
        </Box>
      </Container>

      {isError && (
        <Alert
          severity="error"
          onClose={() => {
            setIsError(false);
          }}
        >
          Failed
        </Alert>
      )}
      <Stack
        display={"flex"}
        justifyContent={"center"}
        spacing={{ xs: 1, sm: 2 }}
        direction="row"
        useFlexGap
        flexWrap="wrap"
        marginTop={6}
      >
        {tags.map((tag) => (
          <ButtonBase
            key={tag.id}
            onClick={() => {
              name.current.value = tag.name;
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
      <Dialog open={openDialog} onClose={handleCancelDialog}>
        <DialogTitle>Confirm delete category</DialogTitle>
        <DialogActions>
          <Button onClick={handleCancelDialog}>Cancel</Button>
          <Button
            sx={{
              backgroundColor: "#ef233c",
              color: "white",
            }}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
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
