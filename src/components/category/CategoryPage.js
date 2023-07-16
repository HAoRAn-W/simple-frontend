import { Container, Grid, Typography } from "@mui/material";
import React from "react";
import CategoryCard from "./CategoryCard";

function CategoryPage() {
  return (
    <main>
      <Container style={{ alignItems: "center" }}  >
        <Typography variant="h4" marginLeft={'40px'} marginBottom={'40px'} marginTop={'40px'}>Category</Typography>
        <Grid container spacing={5}>
          <Grid item marginLeft={'40px'}>
            <CategoryCard />
          </Grid>
          <Grid item marginLeft={'40px'}>
            <CategoryCard />
          </Grid>
          <Grid item marginLeft={'40px'}>
            <CategoryCard />
          </Grid>
          <Grid item marginLeft={'40px'}>
            <CategoryCard />
          </Grid>
        </Grid>
      </Container>
    </main>
  );
}

export default CategoryPage;
