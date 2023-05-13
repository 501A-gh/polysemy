import React from 'react'
import { type VariantProps, cva } from 'class-variance-authority';

export const displayRowStyle = cva("div", {
  variants: {
    position:{
      center: "text-center",
      left: "text-left",
      right: "text-right",
    },
    bold:{
      false: "font-normal",
      true: "font-bold",
    },
    italic:{
      false: "non-italic",
      true: "italic",
    },
    intent: {
      p:[
        "text-sm"
      ],
      h1:[
        "text-4xl",
      ],
      h2:[
        "text-3xl",
      ],
      h3:[
        "text-2xl",
      ],
      h4:[
        "text-xl",
      ],
      h5:[
        "text-lg",
      ],
      h6:[
        "text-base",
      ],
    },
  },
  defaultVariants:{
    position:"left",
    intent:"p"
  }
});

export interface DisplayRowProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof displayRowStyle> {
}

export const DisplayRow: React.FC<DisplayRowProps> = ({
  className,
  position,
  bold,
  italic,
  intent,
  ...props
}) => (
  <div
    className={
      displayRowStyle({
        className,
        position,
        bold,
        italic,
        intent,
      }) + 
      ` 
        text-ms
        m-0
        mr-3
        p-0 w-full
        text-gray-800
        dark:text-gray-400
        print:text-black
      `
    }
    {...props}
  >
    {props.children}
  </div>
);