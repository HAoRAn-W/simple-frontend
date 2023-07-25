import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";

function CategoryCard({ category }) {
  return (
    <Card>
      <CardMedia
        sx={{ height: 140, width: 300 }}
        image={category.coverUrl}
        title="green iguana"
      />
      <CardContent>
        <Typography variant="h5">{category.name}</Typography>
      </CardContent>
    </Card>
  );
}

export default CategoryCard;
