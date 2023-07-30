import React, { useEffect, useState } from "react";
import TagService from "../../app/services/tag.service";
import { SUCCESSFUL } from "../../app/constants/MessageCode";
import {
  Alert,
  Box,
  Button,
  ButtonBase,
  Dialog,
  DialogActions,
  DialogTitle,
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

  const [openDialog, setOpenDialog] = useState(false);

  const handleCancelDialog = () => {
    setOpenDialog(false);
  };

  const handleDelete = () => {
    TagService.deleteTag(id);
    setOpenDialog(false);
    setName("");
    setIsUpdate(false);
    setId();
  };

  useEffect(() => {
    TagService.getTagList().then((data) => {
      console.log("tag lists data:", data);
      if (data.code === SUCCESSFUL) {
        setTags(data.tags);
      }
    });
  }, []);

  return (
    <div
      style={{
        width: "90%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <TextField
        label="Name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        fullWidth
        sx={{ marginTop: 5, marginBottom: 5, display: "block" }}
      />
      <Box>
        <Button
          sx={{ marginX: "10px" }}
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
              sx={{ marginX: "10px" }}
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
