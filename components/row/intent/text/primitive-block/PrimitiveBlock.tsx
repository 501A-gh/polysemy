import { BlockModeTypes } from "@/util/helper/blockUtilities";
import React from "react";

interface PrimitiveBlockProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  ref: any;
  blockIndex: number;
  selected: number[];
  text: string;
  blockMode: BlockModeTypes;
}

const PrimitiveBlock: React.FC<PrimitiveBlockProps> = ({
  ref,
  blockIndex,
  selected,
  text,
  blockMode,
  ...props
}) => {
  return (
    <>
      <button
        ref={ref}
        type="button"
        className={`
          block
          ${
            selected.includes(blockIndex)
              ? `
              rounded-none
              text-gray-900
              focus:text-black
              focus:shadow-green-400/40
              bg-green-300
              focus:bg-green-400
              border-green-300
              dark:bg-green-500
              dark:focus:bg-green-200
              dark:border-green-500
            `
              : `
              ${
                blockMode === "standard"
                  ? `
                  border
                  rounded-sm
                  text-gray-600
                  dark:text-gray-400
                  focus:bg-gray-200
                  dark:focus:bg-gray-800 
                  focus:border-b-gray-300
                  dark:focus:border-b-gray-700
                  focus:text-black
                  focus:dark:text-white
                  duration-200
                `
                  : ""
              }
              ${blockMode === "edit" ? "block-edit" : ""}
              ${blockMode === "insert" ? "block-standard" : ""}
              ${blockMode === "command" ? "block-command" : ""}
              ${blockMode === "highlight" ? "block-highlight" : ""}
              ${blockMode === "groupEdit" ? "block-standard" : ""}
              ${blockMode === "groupInsert" ? "block-standard" : ""}
            `
          }
        `}
        {...props}
      >
        {text}
      </button>
    </>
  );
};

export default PrimitiveBlock;
