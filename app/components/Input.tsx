import React from 'react'
import { type VariantProps, cva } from 'class-variance-authority';

const input = cva("input", {
  variants: {
    intent: {
      standard: [
        "text-orange-500", 
        "placeholder:text-orange-500"
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

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof input> {
  icon?:JSX.Element
}

export const Input: React.FC<InputProps> = ({
  className,
  intent,
  ...props
}) => (
  <input
    className={
      input({ intent, className }) + 
      ` 
        my-0.5
        focus:outline-none
        font-mono text-xs
        w-fit h-fit
        border 
        py-1
        px-2    
        rounded-md
        ml-0.5
        shadow-md
        shadow-gray-200
        dark:shadow-gray-900
        bg-gray-100
        border-gray-300
        dark:bg-gray-800
        dark:border-gray-700
      `
    }
    {...props}
  />
);