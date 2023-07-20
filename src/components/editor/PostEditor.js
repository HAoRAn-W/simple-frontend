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
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function PostEditor({isNew, original}) {
  const [category, setCategory] = useState("");
  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  const navigate = useNavigate();

  const handleSubmit =() => {
    // todo submit to backend
    navigate('/editor')
  }
  return (
    <div>
      <Box component={"form"} onSubmit={handleSubmit}>
        <Grid container style={{ display: "flex", flexDirection: "column" }}>
          <Grid item>
            <TextField label="title" />
          </Grid>
          <Grid item>
            <TextField multiline label="content" />
          </Grid>
          <Grid item>
            <FormControl sx={{ m: 1, minWidth: 150 }}>
              <InputLabel id="category-id">Category</InputLabel>
              <Select
                labelId="category-id"
                id="category-selector"
                value={category}
                lable="Category"
                onChange={handleChange}
              >
                <MenuItem value={""}>
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"java"}>Java</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
          <Button variant="contained" type="submit">Save</Button>

          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default PostEditor;
