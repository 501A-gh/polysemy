import React, { useRef, useState } from "react";
import { GroupBlockDictType } from "@/util/data/groupBlockDict";
import { selectBlockIndex } from "@/util/helper/blockUtilities";
import FunctionBar from "@/components/ui/function-bar/FunctionBar";
import Block from "../block/Block";
import { BlockModeTypes } from "../primitive-block/PrimitiveBlock";
import GroupBlockWrapper from "./GroupBlockWrapper";
import {
  createGroupBlockModeAtIndex,
  groupBackspace,
  groupEdit,
  groupInsert,
  updateGroupBlockModeAtIndex,
} from "@/util/helper/groupBlockUtilities";

interface GroupBlockInsertProps {
  updateBlockMode: (mode: BlockModeTypes) => void;
  insertGroupBlock: (text: string) => void;
  groupBlockText: string;
  groupBlockIntent: GroupBlockDictType | undefined;
  createCaretBlockMode?: () => void;
}

const GroupBlockInsert: React.FC<GroupBlockInsertProps> = ({
  updateBlockMode,
  insertGroupBlock,
  groupBlockText,
  groupBlockIntent,
  createCaretBlockMode,
  ...props
}) => {
  const caretRef = useRef<HTMLInputElement>(null);
  const focusOnCaret = () => {
    if (caretRef.current != null) {
      caretRef.current.focus();
    }
  };

  const [input, setInput] = useState<string>("");
  const [groupBlock, setGroupBlock] = useState<string[]>(
    groupBlockText ? groupBlockText.slice(1, -1).split(" ") : []
  );
  const [selectBlocks, setSelectBlocks] = useState<number[]>([]);

  const insertAndSave = () => {
    insertGroupBlock(
      `${groupBlockIntent?.start}${groupBlock.join(" ")}${
        groupBlockIntent?.end
      }`
    );
    updateBlockMode("standard");
  };

  const groupBlockModeOriginal = new Array(groupBlock.length).fill("standard");
  const [groupBlockMode, setGroupBlockMode] = useState<BlockModeTypes[]>(
    groupBlockModeOriginal
  );

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

export default GroupBlockInsert;
