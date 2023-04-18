import React from 'react'
import { type VariantProps, cva } from 'class-variance-authority';

const button = cva("button", {
  variants: {
    intent: {
      standard: [
        "text-gray-500",
        "focus:border-gray-700",
        "focus:text-white",
        "dark:text-gray-500",
        "dark:focus:border-gray-700",
        "dark:focus:text-black",
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
        rounded-md
        text-sm
        py-0.5
        px-1
        my-0.5
        mx-0.5
        border
        border-transparent
        focus:outline-none
        focus:shadow
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