import { isTweet } from "@/util/helper/url";
import { Link1Icon, TwitterLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";
import ReactMarkdown, { Components } from "react-markdown";

interface MarkdownRenderProps {
  content: string;
}

const BlockMdRender: React.FC<MarkdownRenderProps> = ({ content }) => {
  const renderers: Components = {
    p: (props) => <>{props.children}</>,
    a: (props) => (
      <Link
        href={`${props.href}`}
        className={`
          flex gap-1 items-center border border-transparent border-b-slate-200
          focus:bg-green-600 focus:outline-none
        `}
        target="_blank"
        rel="noopener noreferrer"
      >
        {isTweet(`${props.href}`) ? <TwitterLogoIcon /> : <Link1Icon />}
        {props.children}
      </Link>
    ),
    strong: (props) => <strong>{props.children}</strong>,
    em: (props) => <em>{props.children}</em>,
    code: (props) => <code>{props.children}</code>,
  };

  return <ReactMarkdown components={renderers}>{content}</ReactMarkdown>;
};

export default BlockMdRender;
