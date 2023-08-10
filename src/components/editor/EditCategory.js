import React, { useRef, useState } from "react";
import CategoryPage from "../category/CategoryPage";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogTitle,
  Input,
  InputLabel,
} from "@mui/material";
import CategoryService from "../../app/services/category.service";

function EditCategory() {
  const name = useRef(null);
  const coverUrl = useRef(null);

  const [isUpdate, setIsUpdate] = useState(false);
  const [id, setId] = useState();

  const [openDialog, setOpenDialog] = useState(false);

  const handleCancelDialog = () => {
    setOpenDialog(false);
  };

  const handleDelete = () => {
    CategoryService.deleteCategory(id);
    setOpenDialog(false);
    name.current.value = "";
    coverUrl.current.value = "";
    setIsUpdate(false);
    setId();
  };

  return (
    <div>
      <Container>
        <form>
          <InputLabel htmlFor="name">Name</InputLabel>
          <Input id="name" inputRef={name} fullWidth sx={{marginBottom: 4}}/>
          <InputLabel htmlFor="coverurl">Cover Picture</InputLabel>
          <Input id="coverurl" inputRef={coverUrl} fullWidth sx={{marginBottom: 4}}/>
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
                  name: name.current.value,
                  coverUrl: coverUrl.current.value,
                });
              } else {
                CategoryService.addCategory({
                  name: name.current.value,
                  coverUrl: coverUrl.current.value,
                });
              }
              name.current.value = "";
              coverUrl.current.value = "";
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
                name.current.value = "";
                coverUrl.current.value = "";
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
        name={name}
        coverUrl={coverUrl}
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
