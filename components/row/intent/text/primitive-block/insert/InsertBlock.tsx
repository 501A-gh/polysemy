import React from "react";
import { BlockModeTypes } from "../PrimitiveBlock";
import InsertInput, { InsertInputProps } from "./InsertInput";
import InsertInputSpace, { InsertInputSpaceProps } from "./InsertInputSpace";

interface InsertBlockProps extends InsertInputProps, InsertInputSpaceProps {
  blockMode: BlockModeTypes;
}

const InsertBlock: React.FC<InsertBlockProps> = ({
  blockMode,
  blockIndex,
  insert,
  createBlockMode,
  updateBlockMode,
  selected,
  symbolToGroupBlockIntent,
}) => {
  return (
    <>
      {blockMode === "insert" ? (
        <InsertInput
          insert={insert}
          createBlockMode={createBlockMode}
          updateBlockMode={updateBlockMode}
          symbolToGroupBlockIntent={symbolToGroupBlockIntent}
        />
      ) : (
        <InsertInputSpace
          selected={selected}
          blockIndex={blockIndex}
          onClick={() => updateBlockMode("insert")}
        />
      )}
    </>
  );
};

export default InsertBlock;
