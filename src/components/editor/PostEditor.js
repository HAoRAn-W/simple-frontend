import {
  Button,
  Container,
  FormControl,
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

  const [categories, setCategories] = useState([]);

  useEffect(() => {}, []);

  useEffect(() => {
    if (!isNew) {
      PostService.getPost(postId).then((data) => {
        const original = data.post;
        console.log("original:", original);
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
    <Container>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          fullWidth
          sx={{ marginTop: 5, marginBottom: 5, display: "block" }}
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          fullWidth
          sx={{ marginTop: 5, marginBottom: 5, display: "block" }}
          multiline
          rows={4}
          maxRows={4}
        />
        <TextField
          label="Content"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          fullWidth
          sx={{ marginTop: 5, marginBottom: 5, display: "block" }}
          multiline
          rows={20}
          maxRows={50}
        />
        <FormControl fullWidth>
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
      </form>
      {isNew ? (
        <Button variant="contained" type="submit">
          Save
        </Button>
      ) : (
        <Button variant="contained" type="submit">
          Update
        </Button>
      )}
    </Container>
  );
}

export default PostEditor;
