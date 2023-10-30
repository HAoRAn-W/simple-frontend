import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Image from "mui-image";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import remarkGfm from "remark-gfm";

function PostMarkdown({ content }) {
  const renderers = {
    h1: ({ children }) => (
      <Typography sx={{ fontSize: { xs: "2rem", md: "2.4rem" } }}>
        {children}
      </Typography>
    ),
    h2: ({ children }) => (
      <Typography sx={{ fontSize: { xs: "1.8rem", md: "2rem" } }}>
        {children}
      </Typography>
    ),
    h3: ({ children }) => (
      <Typography sx={{ fontSize: { xs: "1.6rem", md: "1.8rem" } }}>
        <b>{children}</b>
      </Typography>
    ),
    h4: ({ children }) => (
      <Typography sx={{ fontSize: { xs: "1.5rem", md: "1.65rem" } }}>
        {children}
      </Typography>
    ),
    h5: ({ children }) => (
      <Typography sx={{ fontSize: { xs: "1.4rem", md: "1.6rem" } }}>
        {children}
      </Typography>
    ),
    h6: ({ children }) => (
      <Typography sx={{ fontSize: { xs: "1.3rem", md: "1.5rem" } }}>
        {children}
      </Typography>
    ),
    p: ({ children }) => (
      <Typography
        variant="body"
        fontSize={"1.3rem"}
        style={{ wordWrap: "break-word" }}
        gutterBottom
      >
        {children}
      </Typography>
    ),
    ul: ({ children }) => <Typography component="ul">{children}</Typography>,
    ol: ({ children }) => <Typography component="ol">{children}</Typography>,
    li: ({ children }) => (
      <Typography
        component="li"
        variant="body"
        fontSize={25}
        style={{ wordWrap: "break-word" }}
        gutterBottom
      >
        {children}
      </Typography>
    ),
    img: ({ node, src, alt, title, ...props }) => {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Image
            src={src}
            alt={alt}
            title={title}
            fit="contain"
            duration={200}
            height={"70%"}
            width={"70%"}
          />
        </div>
      );
    },
    code: ({ node, inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          {...props}
          children={String(children).replace(/\n$/, "")}
          language={match[1]}
          showLineNumbers
          PreTag="div"
        />
      ) : (
        <code {...props} className={className}>
          {children}
        </code>
      );
    },
    table: ({ children }) => (
      <TableContainer sx={{ marginY: 4, paddingX: 5 }}>
        <Table>{children}</Table>
      </TableContainer>
    ),
    thead: ({ children }) => <TableHead>{children}</TableHead>,
    tbody: ({ children }) => <TableBody>{children}</TableBody>,
    tr: ({ children }) => <TableRow>{children}</TableRow>,
    th: ({ children }) => (
      <TableCell
        align="center"
        style={{ fontWeight: "bold", fontSize: "1.2rem" }}
      >
        {children}
      </TableCell>
    ),
    td: ({ children }) => <TableCell align="center">{children}</TableCell>,
  };
  return (
    <>
      <ReactMarkdown components={renderers} remarkPlugins={remarkGfm}>
        {content}
      </ReactMarkdown>
    </>
  );
}

export default PostMarkdown;
