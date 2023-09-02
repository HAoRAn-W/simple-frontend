import { ButtonBase, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import CategoryService from "../../app/services/category.service";
import { SUCCESSFUL } from "../../app/constants/MessageCode";
import { useNavigate } from "react-router-dom";

function CategoryPage() {
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
    <Container
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
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
                  navigate(`/category/${category.id}`);
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
