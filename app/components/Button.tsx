import React from 'react'
import { type VariantProps, cva } from 'class-variance-authority';

const button = cva("button", {
  variants: {
    intent: {
      standard: [
        "text-gray-500",
        "focus:border-gray-700",
        "focus:text-white",
      ],
      word: [
        "text-orange-500",
        "focus:border-orange-600",
        "focus:text-orange-500",
      ],
      highlight: [
        "text-lime-500",
        "focus:border-lime-600",
        "focus:text-lime-500",
      ],
      command: [
        "text-purple-500",
        "focus:border-purple-600",
        "focus:text-purple-500",
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
        bg-gray-800
      `
    }
    {...props}
  >
    {icon}
    {props.children}
  </button>
);