import React, { useState } from "react";
import CategoryPage from "../category/CategoryPage";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogTitle,
  TextField,
} from "@mui/material";
import CategoryService from "../../app/services/category.service";

function EditCategory() {
  const [name, setName] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [id, setId] = useState();

  const [openDialog, setOpenDialog] = useState(false);

  const handleCancelDialog = () => {
    setOpenDialog(false);
  };

  const handleDelete = () => {
    CategoryService.deleteCategory(id);
    setOpenDialog(false);
    setName("");
    setCoverUrl("");
    setIsUpdate(false);
    setId();
  };

  return (
    <div>
      <Container>
        <form>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
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
        </form>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            type="submit"
            sx={{ marginX: "10px" }}
            onClick={() => {
              if (isUpdate) {
                CategoryService.updateCategory({
                  id: id,
                  name: name,
                  coverUrl: coverUrl,
                });
              } else {
                CategoryService.addCategory({ name: name, coverUrl: coverUrl });
              }
              setName("");
              setCoverUrl("");
              setId();
            }}
          >
            Save
          </Button>
          {isUpdate && (
            <Button
              sx={{ marginX: "10px" }}
              variant="contained"
              onClick={() => {
                setIsUpdate(false);
                setName("");
                setCoverUrl("");
                setId();
              }}
            >
              Cancel
            </Button>
          )}
          {isUpdate && (
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
          )}
        </div>
      </Container>
      <CategoryPage
        fromEditor={true}
        setName={setName}
        setCoverUrl={setCoverUrl}
        setIsUpdate={setIsUpdate}
        setId={setId}
      />
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

export default EditCategory;
