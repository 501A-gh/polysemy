import Block from "@/components/row/intent/text/block/Block";
import GroupBlockWrapper from "@/components/row/intent/text/group-block/GroupBlockWrapper";
import { GroupBlockDictType } from "@/util/data/groupBlockDict";
import {
  BlockIntentType,
  BlockModeTypes,
  selectBlockIndex,
} from "@/util/helper/blockUtilities";
import {
  createGroupBlockModeAtIndex,
  groupBackspace,
  groupEdit,
  groupInsert,
  updateGroupBlockModeAtIndex,
} from "@/util/helper/groupBlockUtilities";
import React, { useRef, useState } from "react";
import FunctionBar from "../function-bar/FunctionBar";

interface GroupCaretProps {
  groupBlockIntent: GroupBlockDictType | undefined;
  insertGroupBlock: (text: string) => void;
  // updateBlockMode: () => void;
  setBlockIntent: (blockIntent: BlockIntentType) => void;
}

const GroupCaret: React.FC<GroupCaretProps> = ({
  groupBlockIntent,
  insertGroupBlock,
  // updateBlockMode,
  setBlockIntent,
}) => {
  const caretRef = useRef<HTMLInputElement>(null);
  const focusOnCaret = () => {
    if (caretRef.current != null) {
      caretRef.current.focus();
    }
  };

  const [input, setInput] = useState<string>("");

  const [selectBlocks, setSelectBlocks] = useState<number[]>([]);

  const [groupBlock, setGroupBlock] = useState<string[]>([]);
  const groupBlockModeOriginal = new Array(groupBlock.length).fill("standard");
  const [groupBlockMode, setGroupBlockMode] = useState(groupBlockModeOriginal);

  const insertAndSave = () => {
    insertGroupBlock(
      `${groupBlockIntent?.start}${groupBlock.join(" ")}${
        groupBlockIntent?.end
      }`
    );
    setBlockIntent("standard");
    // updateBlockMode("standard");
  };

  return (
    <GroupBlockWrapper groupBlockIntent={groupBlockIntent}>
      <>
        {groupBlock.length > 0 &&
          groupBlock.map((word: string, i: number) => (
            <Block
              key={i}
              blockIndex={i}
              selected={selectBlocks}
              selectBlock={() =>
                selectBlockIndex(i, selectBlocks, setSelectBlocks)
              }
              word={word}
              focusOnCaret={() => focusOnCaret()}
              backspace={() => groupBackspace(i, groupBlock, setGroupBlock)}
              insert={(input: string) =>
                groupInsert(input, i, groupBlock, setGroupBlock)
              }
              edit={(input: string) =>
                groupEdit(input, i, groupBlock, setGroupBlock)
              }
              blockMode={groupBlockMode[i]}
              createBlockMode={() =>
                createGroupBlockModeAtIndex(
                  i,
                  groupBlockMode,
                  setGroupBlockMode
                )
              }
              updateBlockMode={(mode: BlockModeTypes) =>
                updateGroupBlockModeAtIndex(
                  i,
                  mode,
                  groupBlockMode,
                  setGroupBlockMode
                )
              }
            />
          ))}
        <input
          autoFocus
          placeholder="Type..."
          value={input}
          ref={caretRef}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            switch (e.key) {
              case " ":
                groupInsert(
                  input,
                  groupBlock.length,
                  groupBlock,
                  setGroupBlock
                );
                createGroupBlockModeAtIndex(
                  groupBlockMode.length,
                  groupBlockMode,
                  setGroupBlockMode
                );
                setTimeout(() => setInput(""), 1);
                break;
              case "Enter":
                insertAndSave();
                break;
            }
          }}
        />
        <button className={`btn btn-standard`} onClick={() => insertAndSave()}>
          Done
        </button>
        {selectBlocks.length > 1 && (
          <FunctionBar>
            <button
              autoFocus
              className={`btn btn-selectop`}
              onClick={() => setSelectBlocks([])}
            >
              Test
            </button>
          </FunctionBar>
        )}
      </>
    </GroupBlockWrapper>
  );
};

export default GroupCaret;
