import { Box, Paper, Typography } from "@mui/material";

function PostCover({ post }) {
  const createdDate = new Date(post.createdTime);

  return (
    <>
      <Paper
        sx={{
          position: "relative",
          mb: 4,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundImage: `url(${post.coverUrl})`,
          width: "100vw", // Set the width to the viewport width
          height: "60vh", // Set the height to the viewport height
        }}
      ></Paper>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: "rgba(0,0,0,.4)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          align="center"
          variant="h2"
          style={{ wordWrap: "break-word" }}
          maxWidth={"70%"}
        >
          {post.title}
        </Typography>
        <Typography variant="h4" marginTop={10}>{`${
          createdDate.getMonth() + 1
        }/${createdDate.getDate()}/${createdDate.getFullYear()}`}</Typography>
      </Box>
    </>
  );
}

export default PostCover;
