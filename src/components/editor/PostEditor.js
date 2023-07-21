import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PostService from "../../app/services/post.service";

function PostEditor() {
  const location = useLocation();
  const { isNew, postId } = location.state;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    if (!isNew) {
      PostService.getPost(postId).then((data) => {
        const original = data.post;
        console.log('original:', original)
        setTitle(original.title);
        setDescription(original.description);
        setContent(original.content);
        setCategoryId(original.category.id);
      });
    }
  }, [isNew, postId]);

  const handleChange = (e) => {
    setCategoryId(e.target.value);
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      title: title,
      description: description,
      content: content,
      categoryId: categoryId,
    };

    if (isNew) {
      PostService.addPost(newPost);
    } else {
      newPost.id = postId;
      PostService.updatePost(newPost);
    }

    navigate("/editor");
  };
  return (
    <div>
      <Box component={"form"} onSubmit={handleSubmit}>
        <Grid container style={{ display: "flex", flexDirection: "column" }}>
          <Grid item>
            <TextField
              label="Title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              multiline
              label="Description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </Grid>
          <Grid item>
            <TextField
              multiline
              label="Content"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
          </Grid>
          <Grid item>
            <FormControl sx={{ m: 1, minWidth: 150 }}>
              <InputLabel id="category-id">Category</InputLabel>
              <Select
                labelId="category-id"
                id="category-selector"
                value={categoryId}
                lable="Category"
                onChange={handleChange}
              >
                <MenuItem value={2}>
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>Java</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            {isNew ? (
              <Button variant="contained" type="submit">
                Save
              </Button>
            ) : (
              <Button variant="contained" type="submit">
                Update
              </Button>
            )}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default PostEditor;
