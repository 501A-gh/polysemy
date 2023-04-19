import React from 'react'
import { type VariantProps, cva } from 'class-variance-authority';

const button = cva("button", {
  variants: {
    intent: {
      standard: [
        "bg-gray-300",
        "dark:bg-gray-800",
        "text-gray-500",
        "focus:shadow-gray-400/40",

        "focus:text-gray-100",
        "focus:bg-gray-400",

      "dark:focus:bg-gray-700 ",
      ],
      word: [
        "text-orange-500",
        "focus:shadow-orange-400/40",

        "focus:text-white",
        "focus:bg-orange-400",
        "dark:focus:text-black",
        "dark:focus:bg-orange-500",
      ],
      highlight: [
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
      ]
    },
  },
  defaultVariants:{
    intent:"standard"
  }
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
  icon?:JSX.Element
}

export const Button: React.FC<ButtonProps> = ({
  className,
  intent,
  icon,
  ...props
}) => (
  <button
    className={
      button({ intent, className }) + 
      ` 
        font-sans
        rounded-md text-xs
        py-1
        px-1.5
        my-0.5
        mx-0.5
        border
        border-none
        focus:outline-none
        flex
        items-center
        gap-1.5
        whitespace-nowrap
        bg-gray-200
        dark:bg-gray-800
      `
    }
    {...props}
  >
    {icon}
    {props.children}
  </button>
);