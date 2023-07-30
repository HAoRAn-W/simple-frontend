import {
  Button,
  Checkbox,
  Container,
  Dialog,
  DialogActions,
  DialogTitle,
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
  const [pinned, setPinned] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    CategoryService.getCategoryList().then((data) => {
      setCategories(data.categories);
    });
    TagService.getTagList().then((data) => {
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
        setSelectedTags((prev) => {
          const updatedTags = new Set([...original.tags.map((tag) => tag.id)]);
          console.log("updatedTags", updatedTags);
          return updatedTags;
        });
        setPinned(original.pinned);
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

  const handlePin = () => {
    setPinned((prev) => {
      return !prev;
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
      pinned: pinned,
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

  const handleCancelDialog = () => {
    setOpenDialog(false);
  };

  const handleDelete = () => {
    PostService.deletePost(postId).then((data) => {
      if (data.code === SUCCESSFUL) {
        navigate(-1);
      }
      setOpenDialog(false);
    });
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
            <Grid container spacing={2}>
              {/* Use Grid container */}
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
        <FormControl fullWidth component="fieldset" variant="standard">
          <FormLabel>Pin this post</FormLabel>
          <FormControlLabel
            control={<Checkbox checked={pinned} onChange={handlePin} />}
            label="Pin"
          />
        </FormControl>
      </form>

      <Button
        variant="contained"
        type="submit"
        sx={{ marginTop: 6, marginRight: 2 }}
        onClick={handleSubmit}
      >
        {isNew ? "save" : "update"}
      </Button>
      <Button
        variant="contained"
        sx={{ marginTop: 6, marginRight: 2 }}
        onClick={() => {
          navigate(-1);
        }}
      >
        Cancel
      </Button>
      {!isNew && (
        <Button
          sx={{
            backgroundColor: "#ef233c",
            color: "white",
            marginTop: 6,
            marginRight: 2,
          }}
          variant="contained"
          onClick={() => {
            setOpenDialog(true);
          }}
        >
          Delete
        </Button>
      )}
      {/* updating the state within the component's render function or event handlers may cause too many re-renders
        in this case onClose is the one that triggers infinite loop
      */}
      <Dialog open={openDialog} onClose={handleCancelDialog}>
        <DialogTitle>Confirm delete post</DialogTitle>
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
    </Container>
  );
}

export default PostEditor;
