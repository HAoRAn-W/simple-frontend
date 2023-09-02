import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  ButtonBase,
  Container,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  Input,
  InputLabel,
  Typography,
} from "@mui/material";
import CategoryService from "../../app/services/category.service";
import CategoryCard from "../category/CategoryCard";
import { SUCCESSFUL } from "../../app/constants/MessageCode";

function EditCategory() {
  const [categories, setCategories] = useState([]);
  const name = useRef(null);
  const coverUrl = useRef(null);

  const [isUpdate, setIsUpdate] = useState(false);
  const [id, setId] = useState();

  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    CategoryService.getCategoryList().then((data) => {
      if (data.code === SUCCESSFUL) {
        setCategories(data.categories);
      }
    });
  }, []);

  const updateCategories = () => {
    CategoryService.getCategoryList().then((data) => {
      if (data.code === SUCCESSFUL) {
        setCategories(data.categories);
      }
    });
  }

  const handleCancelDialog = () => {
    setOpenDialog(false);
  };

  const handleDelete = () => {
    CategoryService.deleteCategory(id).then(() => {
      updateCategories()
    });
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
          <Input id="name" inputRef={name} fullWidth sx={{ marginBottom: 4 }} />
          <InputLabel htmlFor="coverurl">Cover Picture</InputLabel>
          <Input
            id="coverurl"
            inputRef={coverUrl}
            fullWidth
            sx={{ marginBottom: 4 }}
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
                  name: name.current.value,
                  coverUrl: coverUrl.current.value,
                }).then(() => {
                  updateCategories()
                });
              } else {
                CategoryService.addCategory({
                  name: name.current.value,
                  coverUrl: coverUrl.current.value,
                }).then(() => {
                  updateCategories()
                });
              }
              name.current.value = "";
              coverUrl.current.value = "";
              setId();
            }}
          >
            {isUpdate ? "Update" : "Add"}
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
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" marginTop={"40px"} marginBottom={"30px"}>
          Categories
        </Typography>

        <Grid container rowSpacing={4}>
          {categories.map((category) => {
            return (
              <Grid
                item
                key={category.id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <ButtonBase
                  onClick={() => {
                    setIsUpdate(true);
                    setId(category.id);
                    name.current.value = category.name;
                    coverUrl.current.value = category.coverUrl;
                  }}
                >
                  <CategoryCard category={category} />
                </ButtonBase>
              </Grid>
            );
          })}
        </Grid>
      </Container>
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
