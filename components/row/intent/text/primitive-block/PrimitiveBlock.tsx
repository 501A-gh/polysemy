import { VariantProps, cva } from "class-variance-authority";
import React from "react";
import BlockMdRender from "./BlockMdRender";

const primitiveBlockMode = cva("block", {
  variants: {
    blockMode: {
      standard: ["block-standard"],
      edit: ["block-edit"],
      insert: ["block-standard"],
      command: ["block-command"],
      highlight: ["block-highlight"],
      groupEdit: ["block-standard"],
      groupInsert: ["block-standard"],
    },
  },
});

export type BlockModeTypes = VariantProps<
  typeof primitiveBlockMode
>["blockMode"];

interface PrimitiveBlockProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof primitiveBlockMode> {
  ref: any;
  blockIndex: number;
  selected: number[];
  text: string;
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
    <button
      ref={ref}
      type="button"
      className={primitiveBlockMode({
        blockMode: selected.includes(blockIndex) ? "highlight" : blockMode,
      })}
      {...props}
    >
      <BlockMdRender content={text} />
    </button>
  );
};

export default PrimitiveBlock;
