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
              ? `block-mode-highlight`
              : `
              ${
                blockMode === "standard" || blockMode === "insert"
                  ? `block-mode-standard rounded-sm`
                  : ""
              }
              ${blockMode === "edit" ? "block-mode-edit" : ""}
              ${blockMode === "command" ? "block-mode-command" : ""}
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
