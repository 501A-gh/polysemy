import React from "react";
import InsertInput from "./InsertInput";
import InsertInputSpace from "./InsertInputSpace";
import GroupBlockInsert from "../../group-block/GroupBlockInsert";
import type { BlockType } from "../../TextInterpreter";
import type { GroupBlockDictType } from "@/util/data/groupBlockDict";
import { formatContent } from "@/util/helper/globalUtilities";
import type { ActionTypes } from "@/util/helper/globalUtilities";

export interface PrimitiveBlockInsertProps {
  blockIndex: number;
  insert: (newBlockObj: BlockType) => void;
  edit: (newBlockObj: BlockType) => void;
  action: ActionTypes;
  setAction: React.Dispatch<React.SetStateAction<ActionTypes>>;
  groupBlockIntent: GroupBlockDictType | undefined;
  selected: number[];
  symbolToGroupBlockIntent: (symbol: string) => void;
}

const PrimitiveBlockInsert: React.FC<PrimitiveBlockInsertProps> = ({
  blockIndex,
  insert,
  edit,
  action,
  setAction,
  groupBlockIntent,
  selected,
  symbolToGroupBlockIntent,
}) => {
  return (
    <>
      {action === "standard" ? (
        <InsertInputSpace
          selected={selected}
          blockIndex={blockIndex}
          onClick={() => setAction("insert")}
        />
      ) : (
        <>
          {action === "insert" && (
            <InsertInput
              insert={insert}
              setAction={setAction}
              symbolToGroupBlockIntent={symbolToGroupBlockIntent}
            />
          )}
          {action === "groupInsert" && (
            <GroupBlockInsert
              blocksData={[]}
              groupBlockIntent={groupBlockIntent}
              enter={(blocksData: BlockType[]) =>
                insert({
                  type: "group",
                  content: formatContent.groupBlock(
                    groupBlockIntent,
                    blocksData
                  ),
                })
              }
            />
          )}
        </>
      )}
    </>
  );
};

export default PrimitiveBlockInsert;
