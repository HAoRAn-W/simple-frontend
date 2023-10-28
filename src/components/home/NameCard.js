import {
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
import {
  faInstagram,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

function NameCard() {
  return (
    <Card sx={{ maxWidth: "100%" }}>
      <CardHeader title="Haoran Wang" subheader="human"></CardHeader>
      <CardMedia
        component="img"
        height="194"
        image="https://i.imgur.com/4KfvBFd.jpg"
        alt="pic"
      />
      <CardContent>
        <Typography variant="body2">
          Welcome to whr.one, my personal blog website! I'm currently learning
          computer programming. I'm an Assassin's Creed fan, and a museum lover.
          🍉 is my favorite fruit. Favorite city: Paris. I'm listening to 1989
          taylor's version.🎧 Nice to meet you here!
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton href="https://twitter.com/WHRONE233" target="_blank">
          <FontAwesomeIcon icon={faTwitter} style={{ color: "#1da1f2" }} />
        </IconButton>
        <IconButton href="https://www.instagram.com/whr.233/" target="_blank">
          <FontAwesomeIcon icon={faInstagram} style={{ color: "#c13584" }} />
        </IconButton>
        <IconButton href="https://www.linkedin.com/in/whr/" target="_blank">
          <FontAwesomeIcon icon={faLinkedin} style={{ color: "#0077b5" }} />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default NameCard;
