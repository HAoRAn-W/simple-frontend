import { Typography } from "@mui/material";
import Image from "mui-image";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import remarkGfm from "remark-gfm";




function PostMarkdown({ content }) {

  const renderers = {
    h1: ({ children }) => <Typography variant="h3" fontSize={70} >{children}</Typography>,
    h2: ({ children }) => <Typography variant="h3" fontSize={60}>{children}</Typography>,
    h3: ({ children }) => <Typography variant="h3" fontSize={55}>{children}</Typography>,
    h4: ({ children }) => <Typography variant="h3" fontSize={50}>{children}</Typography>,
    h5: ({ children }) => <Typography variant="h3" fontSize={45}>{children}</Typography>,
    h6: ({ children }) => <Typography variant="h3" fontSize={40}>{children}</Typography>,
    p: ({ node, children }) => <Typography variant="body" fontSize={30}>{children}</Typography>,
    img: ({ node, src, alt, title, ...props }) => {
      return (
        <div style={{ display: 'flex', flexDirection: 'column',alignItems: 'center'}}>
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
  };
  return (
    <>
      <ReactMarkdown components={renderers} remarkPlugins={remarkGfm}>{content}</ReactMarkdown>
    </>
  );
}

export default PostMarkdown;
