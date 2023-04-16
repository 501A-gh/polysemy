import React from 'react'
import { type VariantProps, cva } from 'class-variance-authority';

const button = cva("button", {
  variants: {
    intent: {
      word: [
        "bg-gray-900",
        "text-gray-500 ",
        "focus:border-gray-800",
        "focus:text-orange-500",
      ],
      action: [
        "bg-gray-900",
        "text-purple-700",
        "focus:border-purple-900",
        "focus:text-purple-500",
      ]
    },
  },
  defaultVariants:{
    intent:"word"
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
        rounded-md
        text-sm
        py-0.5
        px-1
        mx-0.5
        mb-1
        border
        border-transparent
        focus:outline-none
        focus:shadow
        flex
        items-center
        gap-1.5
      `
    }
    {...props}
  >
    {icon}
    {props.children}
  </button>
);