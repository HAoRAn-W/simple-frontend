import { Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import CategoryService from "../../app/services/category.service";
import { SUCCESSFUL } from "../../app/constants/MessageCode";

function CategoryPage() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    CategoryService.getCategoryList().then((data) => {
      if (data.code === SUCCESSFUL) {
        setCategories(data.categories);
      }
    });
  }, []);

  return (
    <main>
      <Container style={{ alignItems: "center" }}>
        <Typography
          variant="h4"
          marginLeft={"40px"}
          marginBottom={"40px"}
          marginTop={"40px"}
        >
          Category
        </Typography>

        <Grid container spacing={5}>
          {categories.map((category) => {
            return (
              <Grid item marginLeft={"40px"}>
                <CategoryCard category={category} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </main>
  );
}

export default CategoryPage;
