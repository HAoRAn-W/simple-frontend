import { ButtonBase, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import CategoryService from "../../app/services/category.service";
import { SUCCESSFUL } from "../../app/constants/MessageCode";
import { useNavigate } from "react-router-dom";

function CategoryPage({
  fromEditor,
  setName,
  setCoverUrl,
  setIsUpdate,
  setId,
}) {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    CategoryService.getCategoryList().then((data) => {
      if (data.code === SUCCESSFUL) {
        setCategories(data.categories);
      }
    });
  }, []);

  return (
    <Container style={{ alignItems: "center" }}>
      <Typography
        variant="h4"
        marginLeft={"40px"}
        marginBottom={"40px"}
        marginTop={"40px"}
      >
        Categories
      </Typography>

      <Grid container spacing={5}>
        {categories.map((category) => {
          return (
            <Grid item marginLeft={"40px"} key={category.id}>
              <ButtonBase
                onClick={() => {
                  if (!fromEditor) {
                    navigate(`/category/${category.id}`, {
                      state: { id: category.id },
                    });
                  } else {
                    setIsUpdate(true);
                    setId(category.id);
                    setName(category.name);
                    setCoverUrl(category.coverUrl);
                  }
                }}
              >
                <CategoryCard category={category} />
              </ButtonBase>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}

export default CategoryPage;
