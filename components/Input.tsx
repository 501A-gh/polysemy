import React from "react";
import { type VariantProps, cva } from "class-variance-authority";

const input = cva("input", {
  variants: {
    intent: {
      standard: ["text-orange-500", "focus:placeholder:text-orange-500"],
      word: [
        "text-orange-500",
        "focus:shadow-orange-400/40",

        "focus:text-white",
        "focus:bg-orange-400",
        "dark:focus:text-black",
        "dark:focus:bg-orange-500",
      ],
      highlight: [
        "rounded-none",
        "text-green-500",
        "focus:shadow-green-400/40",
        "focus:text-white",
        "focus:bg-green-400",
        "dark:focus:text-black",
        "dark:focus:bg-green-500",
      ],
      command: [
        "text-purple-500",
        "focus:shadow-purple-400/40",
        "focus:text-white",
        "focus:bg-purple-400",
        "dark:focus:text-black",
        "dark:focus:bg-purple-500",
      ],
    },
  },
  defaultVariants: {
    intent: "standard",
  },
});

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof input> {
  ref?: any;
}

export const Input: React.FC<InputProps> = ({
  className,
  intent,
  ref,
  ...props
}) => (
  <input
    ref={ref}
    spellCheck
    className={
      input({ className, intent }) +
      ` 
        m-0.5
        focus:outline-none
        font-mono text-xs
        w-fit h-fit
        border-none
        py-1
        px-2 
        rounded-sm
        bg-gray-200
        dark:bg-gray-800
      `
    }
    {...props}
  />
);
