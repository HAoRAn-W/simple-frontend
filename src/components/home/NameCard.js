import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import React from "react";

function NameCard() {
  return (
    <Card sx={{ maxWidth: 345, maxHeight:500 }}>
      <CardHeader
        avatar={<Avatar>W</Avatar>}
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      ></CardHeader>
      <CardMedia
        component="img"
        height="194"
        image="https://source.unsplash.com/random?wallpapers"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent>
      <CardActions>
      <IconButton >
          <FavoriteIcon />
        </IconButton>
        <IconButton>
            <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default NameCard;
