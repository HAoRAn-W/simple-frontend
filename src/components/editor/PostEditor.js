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
  Input,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PostService from "../../app/services/post.service";
import CategoryService from "../../app/services/category.service";
import { SUCCESSFUL } from "../../app/constants/MessageCode";
import TagService from "../../app/services/tag.service";

function PostEditor() {
  const location = useLocation();
  const { isNew, postId } = location.state;

  const navigate = useNavigate();

  const titleRef = useRef("");
  const coverUrlRef = useRef("");
  const descriptionRef = useRef("");
  const contentRef = useRef("");
  const [categoryId, setCategoryId]= useState(1);

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
        titleRef.current.value = original.title;
        descriptionRef.current.value = original.description;
        contentRef.current.value = original.content;
        setCategoryId(original.category.id);
        coverUrlRef.current.value = original.coverUrl;

        setSelectedTags((prev) => {
          const updatedTags = new Set([...original.tags.map((tag) => tag.id)]);
          return updatedTags;
        });
        setPinned(original.pinned);
      });
    }
  }, [isNew, postId]);

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
    const newPost = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      content: contentRef.current.value,
      categoryId: categoryId,
      coverUrl: coverUrlRef.current.value,
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
    <Container sx={{ paddingTop: 5 }}>
      <form noValidate autoComplete="off">
        <InputLabel htmlFor="title">Title</InputLabel>
        <Input
          id="title"
          inputRef={titleRef}
          fullWidth
          sx={{ marginBottom: 5 }}
        />

        <InputLabel htmlFor="coverurl">Cover Picture</InputLabel>
        <Input
          id="coverurl"
          inputRef={coverUrlRef}
          fullWidth
          sx={{ marginBottom: 5 }}
        />

        <InputLabel htmlFor="Description">Description</InputLabel>
        <Input
          id="Description"
          inputRef={descriptionRef}
          fullWidth
          sx={{ marginBottom: 5 }}
        />

        <InputLabel htmlFor="Content">Content</InputLabel>
        <Input
          id="Content"
          inputRef={contentRef}
          fullWidth
          sx={{ marginBottom: 5}}
          multiline
          rows={20}
        />

        <FormControl fullWidth required variant="standard">
          <InputLabel id="category-id">Category</InputLabel>
          <Select
            labelId="category-id"
            id="category-selector"
            value={categoryId}
            onChange={e => setCategoryId(e.target.value)}
            lable="Category"
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

        <FormControl fullWidth component="fieldset" variant="standard" sx={{marginTop: 4}}>
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
        <FormControl fullWidth component="fieldset" variant="standard" sx={{marginTop: 4}}>
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
