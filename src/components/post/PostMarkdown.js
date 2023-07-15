import { Typography } from "@mui/material";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

function PostMarkdown({ post }) {
  const renderers = {
    h1: ({ children }) => <Typography variant="h1">{children}</Typography>,
  };
  return (
    <>
      <ReactMarkdown components={renderers}>{post}</ReactMarkdown>
    </>
  );
}

export default PostMarkdown;
