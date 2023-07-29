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
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faLinkedin, faSquareFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";

function NameCard() {
  return (
    <Card sx={{ maxWidth: 345, maxHeight: 500 }}>
      <CardHeader
        avatar={<Avatar>W</Avatar>}
        title="Haoran Wang"
        subheader="Software Engineer"
      ></CardHeader>
      <CardMedia
        component="img"
        height="194"
        image="https://i.imgur.com/JeflHLr.jpg"
        alt="pic"
      />
      <CardContent>
        <Typography variant="body2">
          Assassin's Creed fan, museum lover. 🍉 is my ultimate favorite fruit.
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton href="https://twitter.com/WHRONE233" target="_blank">
          <FontAwesomeIcon icon={faTwitter} style={{ color: "#1da1f2" }} />
        </IconButton>
        <IconButton href="https://www.instagram.com/haoran_233x/" target="_blank">
          <FontAwesomeIcon icon={faInstagram} style={{ color: "#c13584" }} />
        </IconButton>
        <IconButton href="https://www.linkedin.com/in/whr/" target="_blank">
        <FontAwesomeIcon icon={faLinkedin} style={{color: "#0077b5",}} />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default NameCard;
