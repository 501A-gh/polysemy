import React from "react";
import { type VariantProps, cva } from "class-variance-authority";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export const displayRowStyle = cva("div", {
  variants: {
    bold: {
      false: "font-normal",
      true: "font-bold",
    },
    italic: {
      false: "non-italic",
      true: "italic",
    },
  },
  defaultVariants: {},
});

export interface DisplayRowProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof displayRowStyle> {}

export const DisplayRow: React.FC<DisplayRowProps> = ({
  className,
  bold,
  italic,
  ...props
}) => (
  <div {...props}>
    <ReactMarkdown
      className={
        displayRowStyle({
          className,
          bold,
          italic,
        }) +
        ` 
          m-0
          mr-3
          p-0 w-full
          text-gray-800
          dark:text-gray-400
          print:text-black
        `
      }
    >
      {`${props.children}`}
    </ReactMarkdown>
  </div>
);
