import React, { useRef, useState } from "react";
import { GroupBlockDictType } from "@/util/data/groupBlockDict";
import { selectBlockIndex } from "@/util/helper/blockUtilities";
import FunctionBar from "@/components/ui/function-bar/FunctionBar";
import Block from "../block/Block";
import { BlockModeTypes } from "../primitive-block/PrimitiveBlock";
import GroupBlockWrapper from "./GroupBlockWrapper";

interface GroupBlockEditProps {
  updateBlockMode: (mode: BlockModeTypes) => void;
  editGroupBlock: (text: string) => void;
  groupBlockText: string;
  groupBlockIntent: GroupBlockDictType | undefined;
}

const GroupBlockEdit: React.FC<GroupBlockEditProps> = ({
  updateBlockMode,
  editGroupBlock,
  groupBlockText,
  groupBlockIntent,
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

  const backspace = (index: number) => {
    if (index >= 0 && index < groupBlock.length) {
      const newGroupBlock = [...groupBlock];
      newGroupBlock.splice(index, 1);
      setGroupBlock(newGroupBlock);
    }
  };

  const edit = (newValue: string, blockIndex: number) => {
    if (blockIndex >= 0 && blockIndex < groupBlock.length) {
      const newGroupBlock = [...groupBlock];
      newGroupBlock[blockIndex] = newValue;
      setGroupBlock(newGroupBlock);
    }
  };

  const insert = (newValue: string, blockIndex: number) => {
    if (blockIndex >= 0 && blockIndex <= groupBlock.length) {
      const newGroupBlock = [...groupBlock];
      newGroupBlock.splice(blockIndex, 0, newValue);
      setGroupBlock(newGroupBlock);
    }
  };

  const addItemToEndInGroup = (newValue: string): void => {
    setGroupBlock((prevString: string[]) => {
      const updatedStack = [...prevString];
      updatedStack.push(newValue);
      return updatedStack;
    });
  };

  const editAndSave = () => {
    editGroupBlock(
      `${groupBlockIntent?.start}${groupBlock.join(" ")}${
        groupBlockIntent?.end
      }`
    );
    updateBlockMode("standard");
  };

  const groupBlockModeOriginal = new Array(groupBlock.length).fill("standard");
  const [groupBlockMode, setGroupBlockMode] = useState(groupBlockModeOriginal);

  const updateGroupBlockModeAtIndex = (
    index: number,
    newValue: BlockModeTypes
  ) => {
    const updatedArray = [...groupBlockMode];
    updatedArray[index] = newValue;
    setGroupBlockMode(updatedArray);
  };

  const createGroupBlockModeAtIndex = (index: number) => {
    const updatedArray = [...groupBlockMode];
    updatedArray.splice(index, 0, "standard");
    setGroupBlockMode(updatedArray);
  };

  return (
    <GroupBlockWrapper groupBlockIntent={groupBlockIntent}>
      <>
        {groupBlock.length > 0 &&
          groupBlock.map((word: string, i: number) => (
            <Block
              // key={i}
              // blockIndex={i}
              // selected={selectBlocks}
              // selectBlock={() =>
              //   selectBlockIndex(i, selectBlocks, setSelectBlocks)
              // }
              // word={word}
              // focusOnCaret={() => focusOnCaret()}
              // backspaceFx={backspace}
              // insertFx={insert}
              // editFx={edit}
              // blockIntent="standard"
              // blockMode={groupBlockMode[i]}
              // updateBlockModeAtIndex={updateGroupBlockModeAtIndex}
              // createBlockModeAtIndex={createGroupBlockModeAtIndex}
              key={i}
              blockIndex={i}
              selected={selectBlocks}
              selectBlock={() =>
                selectBlockIndex(i, selectBlocks, setSelectBlocks)
              }
              word={word}
              focusOnCaret={() => focusOnCaret()}
              backspace={() => backspace(i)}
              insert={(input: string) => insert(input, i)}
              edit={(input: string) => edit(input, i)}
              blockMode={groupBlockMode[i]}
              createBlockMode={() => createGroupBlockModeAtIndex(i)}
              updateBlockMode={(mode: BlockModeTypes) =>
                updateGroupBlockModeAtIndex(i, mode)
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
                addItemToEndInGroup(input);
                createGroupBlockModeAtIndex(groupBlockMode.length);
                setTimeout(() => setInput(""), 1);
                break;
              case "Enter":
                editAndSave();
                break;
            }
          }}
        />
        <button className={`btn btn-standard`} onClick={() => editAndSave()}>
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

export default GroupBlockEdit;
