import React, { useRef, useState } from "react";
import { GroupBlockDictType } from "@/util/data/groupBlockDict";
import GroupBlockWrapper from "./GroupBlockWrapper";
import { BlockType } from "../TextInterpreter";
import BlockOutput from "../BlockOutput";
import { CheckIcon } from "@radix-ui/react-icons";
import { updateBlock } from "@/util/helper/globalUtilities";

export interface GroupBlockInsertProps {
  blocksData: BlockType[];
  groupBlockIntent: GroupBlockDictType | undefined;
  enter: (newBlocksData: BlockType[]) => void;
}

const GroupBlockInsert: React.FC<GroupBlockInsertProps> = ({
  blocksData,
  groupBlockIntent,
  enter,
  ...props
}) => {
  const caretRef = useRef<HTMLInputElement>(null);
  const focusOnCaret = () => {
    if (caretRef.current != null) {
      caretRef.current.focus();
    }
  };

  const [input, setInput] = useState<string>("");
  const [blocks, setBlocks] = useState<BlockType[]>(blocksData);
  const [selectBlocks, setSelectBlocks] = useState<number[]>([]);

  return (
    <GroupBlockWrapper groupBlockIntent={groupBlockIntent}>
      <BlockOutput
        blocks={blocks}
        setBlocks={setBlocks}
        selectBlocks={selectBlocks}
        setSelectBlocks={setSelectBlocks}
        focusOnCaret={focusOnCaret}
      />
      <>
        {!selectBlocks.length && (
          <>
            <input
              autoFocus
              placeholder="Type in Group..."
              value={input}
              ref={caretRef}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                switch (e.key) {
                  case " ":
                    updateBlock(setBlocks, blocks?.length, "insert", {
                      type: "word",
                      content: input,
                    });
                    setTimeout(() => setInput(""), 1);
                    break;
                  case "Enter":
                    enter(blocks);
                    break;
                }
              }}
            />
            <button className={`btn-standard`} onClick={() => enter(blocks)}>
              <CheckIcon />
              Done
            </button>
          </>
        )}
      </>
    </GroupBlockWrapper>
  );
};

export default GroupBlockInsert;
