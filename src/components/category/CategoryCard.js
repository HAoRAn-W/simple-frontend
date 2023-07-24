import {
  ButtonBase,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function CategoryCard({category}) {
  const navigate = useNavigate();
  return (
    <ButtonBase onClick={() => {
      navigate(`/category/${category.id}`, {state: { id: category.id}})
    }}>
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
    </ButtonBase>
  );
}

export default CategoryCard;
