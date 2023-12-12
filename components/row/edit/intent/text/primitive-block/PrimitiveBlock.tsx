// import { cva } from "class-variance-authority";
import { ActionTypes } from "@/util/helper/blockUtilities";
import React from "react";

interface PrimitiveBlockProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  ref: any;
  blockIndex: number;
  selected: number[];
  text: string;
  action: ActionTypes;
}

const PrimitiveBlock: React.FC<PrimitiveBlockProps> = ({
  ref,
  blockIndex,
  selected,
  text,
  action,
  ...props
}) => {
  return (
    <button
      ref={ref}
      type="button"
      className={`
        border border-transparent 
        text-lg font-sans cursor-pointer 
        outline-none select-none
        px-0.5 my-0.5 duration-200
        ${
          selected.includes(blockIndex)
            ? `
              rounded-none
              text-white
              focus:bg-pink-600
              bg-pink-500
              border-pink-500
              dark:focus:bg-pink-700
              dark:bg-pink-900
              dark:border-pink-900
            `
            : `
            ${
              (action === "standard" || action === "insert") &&
              `
                zinc-text
                focus:bg-zinc-200
                focus:dark:bg-zinc-800 
                focus:border-b-zinc-300
                focus:dark:border-b-zinc-700
                focus:text-black
                focus:dark:text-white 
                rounded-sm
              `
            }
            ${action === "edit" && "blue-text animate-bounce"}
            ${action === "command" && "blue-text animate-pulse"}
            `
        }
      `}
      {...props}
    >
      {text}
    </button>
  );
};

export default PrimitiveBlock;
