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
import CategoryService from "../../app/services/category.service";
import { SUCCESSFUL } from "../../app/constants/MessageCode";

function PostEditor() {
  const location = useLocation();
  const { isNew, postId } = location.state;

  const [title, setTitle] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    CategoryService.getCategoryList().then((data) => {
      setCategories(data.categories);
    });
  }, []);

  useEffect(() => {
    if (!isNew) {
      PostService.getPost(postId).then((data) => {
        const original = data.post;
        console.log("original:", original);
        setTitle(original.title);
        setDescription(original.description);
        setContent(original.content);
        setCategoryId(original.category.id);
        setCoverUrl(original.coverUrl);
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
      coverUrl: coverUrl,
    };

    if (isNew) {
      PostService.addPost(newPost).then(data => {
        if (data.code === SUCCESSFUL) {
          navigate("/editor");
        } else {
          console.log('error:', data);
        }
      });
    } else {
      newPost.id = postId;
      PostService.updatePost(newPost).then(data => {
        if (data.code === SUCCESSFUL) {
          navigate("/editor");
        } else {
          console.log('error:', data);
        }
      });
    }
  };

  return (
    <Container>
      <form noValidate autoComplete="off">
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
          label="Cover Picture"
          value={coverUrl}
          onChange={(e) => {
            setCoverUrl(e.target.value);
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
        />
        <FormControl fullWidth required>
          <InputLabel id="category-id">Category</InputLabel>
          <Select
            labelId="category-id"
            id="category-selector"
            value={categoryId}
            lable="Category"
            onChange={handleChange}
          >
            {categories.map((cate) => {
              return (
                <MenuItem value={cate.id} key={cate.id}>
                  {cate.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </form>

      <Button variant="contained" type="submit" onClick={handleSubmit}>
        {isNew ? "save" : "update"}
      </Button>
    </Container>
  );
}

export default PostEditor;
