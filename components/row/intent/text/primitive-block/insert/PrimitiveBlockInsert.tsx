import React from "react";
import InsertInput, { InsertInputProps } from "./InsertInput";
import InsertInputSpace, { InsertInputSpaceProps } from "./InsertInputSpace";
import GroupBlockInsert, {
  GroupBlockInsertProps,
} from "../../group-block/GroupBlockInsert";
import { BlockModeTypes } from "@/util/helper/blockUtilities";

export interface PrimitiveBlockInsertProps
  extends InsertInputProps,
    InsertInputSpaceProps,
    GroupBlockInsertProps {
  blockMode: BlockModeTypes;
}

const PrimitiveBlockInsert: React.FC<PrimitiveBlockInsertProps> = ({
  blockMode,
  blockIndex,
  insert,
  createBlockMode,
  updateBlockMode,
  groupBlockIntent,
  selected,
  symbolToGroupBlockIntent,
}) => {
  return (
    <>
      {blockMode === "groupInsert" ? (
        <GroupBlockInsert
          groupBlockIntent={groupBlockIntent}
          updateBlockMode={updateBlockMode}
          insert={insert}
          groupBlockText={""}
        />
      ) : (
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
      )}
    </>
  );
};

export default PrimitiveBlockInsert;
