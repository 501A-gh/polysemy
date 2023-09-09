import { VariantProps, cva } from "class-variance-authority";
import React from "react";
import ReactMarkdown from "react-markdown";

const preview = cva(
  [
    "flex",
    "flex-col",
    "justify-between",
    "backdrop-blur",
    "p-5",
    "text-left",
    "w-full",
    "transition-all",
    "border",
  ],
  {
    variants: {
      select: {
        true: [
          "block",
          "appearance-none",
          "rounded-md",
          "min-h-screen",
          "border-gray-300/50",
          "dark:border-gray-800/50",
          "bg-gray-100/80",
          "dark:bg-gray-900/80",
          "focus:border-orange-500",
          "shadow-lg",
        ],
        false: ["hidden"],
      },
    },
    defaultVariants: {
      select: true,
    },
  }
);

interface PreviewProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof preview> {
  children: string;
}

const Preview: React.FC<PreviewProps> = ({
  children,
  select,
  className,
  ...props
}) => {
  return (
    <div
      className={`
        w-full rounded-xl py-5 px-5
        sm:px-10 md:px-28 lg:px-44 xl:px-60 2xl:px-72
      `}
    >
      <div className={preview({ select, className })} {...props}>
        <h1>Preview</h1>
        <ReactMarkdown>{children}</ReactMarkdown>
        <h6
          className={`text-center font-serif italic text-gray-400/80  dark:text-gray-500/80`}
        >
          created using Polysemy.
        </h6>
      </div>
    </div>
  );
};
export default Preview;
