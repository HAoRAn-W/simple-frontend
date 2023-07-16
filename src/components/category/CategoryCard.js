import {
  ButtonBase,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";

function CategoryCard() {
  return (
    <ButtonBase>
      <Card>
        <CardMedia
          sx={{ height: 140, width: 300 }}
          image="https://source.unsplash.com/random?wallpapers"
          title="green iguana"
        />
        <CardContent>
          <Typography variant="h5">Java</Typography>
        </CardContent>
      </Card>
    </ButtonBase>
  );
}

export default CategoryCard;
