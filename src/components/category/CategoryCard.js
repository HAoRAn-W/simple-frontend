import {Paper, Typography } from "@mui/material";
import Image from "mui-image";
import React from "react";

function CategoryCard({ category }) {
  return (
    <Paper style={{ display: "flex", flexDirection: "column", width: 260, height: 260,  }}>
      <div style={{ flex: 8 , overflow: 'hidden'}}>
        <Image src={category.coverUrl}/>
      </div>
      <div style={{ flex: 4, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h5">{category.name}</Typography>
      </div>
    </Paper>
  );
}

export default CategoryCard;
