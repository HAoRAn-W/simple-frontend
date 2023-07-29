import {
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
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
import TagService from "../../app/services/tag.service";

function PostEditor() {
  const location = useLocation();
  const { isNew, postId } = location.state;

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState(new Set());

  useEffect(() => {
    CategoryService.getCategoryList().then((data) => {
      setCategories(data.categories);
    });
    TagService.getTagList().then((data) => {
      console.log(data.tags);
      setTags(data.tags);
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
        console.log(original.tags);
        setSelectedTags((prev) => {
          const updatedTags = new Set([...original.tags.map((tag) => tag.id)]);
          console.log("updatedTags", updatedTags);
          return updatedTags;
        });
      });
    }
  }, [isNew, postId]);

  const handleChange = (e) => {
    setCategoryId(e.target.value);
  };

  const handleChecked = (e) => {
    // remeber to convert string to number, otherwise, you can only add, cannot remove. becasue set.has() always false
    const selected = Number(e.target.name);
    setSelectedTags((prev) => {
      const updatedTags = new Set(prev);
      if (e.target.checked) {
        updatedTags.add(selected);
      } else {
        updatedTags.delete(selected);
      }
      console.log(updatedTags);
      return updatedTags;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("tagIds:", selectedTags);
    const newPost = {
      title: title,
      description: description,
      content: content,
      categoryId: categoryId,
      coverUrl: coverUrl,
      tagIds: [...selectedTags], // set to array
    };

    if (isNew) {
      PostService.addPost(newPost).then((data) => {
        if (data.code === SUCCESSFUL) {
          navigate("/editor");
        } else {
          console.log("error:", data);
        }
      });
    } else {
      newPost.id = postId;
      PostService.updatePost(newPost).then((data) => {
        if (data.code === SUCCESSFUL) {
          navigate("/editor");
        } else {
          console.log("error:", data);
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
        <FormControl fullWidth required variant="standard">
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

        <FormControl fullWidth component="fieldset" variant="standard">
          <FormLabel>Tags</FormLabel>
          <FormGroup>
          <Grid container spacing={2}> {/* Use Grid container */}
            {tags.map((tag) => (
              <Grid item xs={12} sm={3} md={2} key={tag.id}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedTags.has(tag.id)}
                    onChange={handleChecked}
                    name={tag.id}
                  />
                }
                label={tag.name}
              />
              </Grid>
            ))}
            </Grid>
          </FormGroup>
        </FormControl>
      </form>

      <Button
        variant="contained"
        type="submit"
        sx={{ marginTop: 6 }}
        onClick={handleSubmit}
      >
        {isNew ? "save" : "update"}
      </Button>
    </Container>
  );
}

export default PostEditor;
