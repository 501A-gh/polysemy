import React, { useRef, useState } from "react";
import { GroupBlockDictType } from "@/util/data/groupBlockDict";
import {
  ActionTypes,
  backspace,
  copy,
  formatContent,
  getGroupBlockIntentData,
  updateBlock,
} from "@/util/helper/blockUtilities";
import PrimitiveBlockInsert from "../primitive-block/insert/PrimitiveBlockInsert";
import GroupPrimitiveBlock from "../primitive-block/GroupPrimitiveBlock";
import { BlockType, splitMarkdownIntoBlocks } from "../TextInterpreter";
import { GeneralBlockProps } from "../BlockOutput";
import GroupBlockInsert from "./GroupBlockInsert";

const GroupBlock: React.FC<GeneralBlockProps> = ({
  blockIndex,
  setBlocks,
  selected,
  selectBlock,
  word,
  focusOnCaret,
}) => {
  const insert = (newBlockObj: BlockType) =>
    updateBlock(setBlocks, blockIndex, "insert", newBlockObj);
  const edit = (newBlockObj: BlockType) =>
    updateBlock(setBlocks, blockIndex, "edit", newBlockObj);

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const focusOnBlock = () =>
    setTimeout(() => {
      if (buttonRef.current) {
        buttonRef.current.focus();
      }
    }, 1);

  const [groupBlockIntent, setGroupBlockIntent] =
    useState<GroupBlockDictType>();

  const [action, setAction] = useState<ActionTypes>("standard");

  return (
    <>
      <PrimitiveBlockInsert
        action={action}
        setAction={setAction}
        blockIndex={blockIndex}
        selected={selected}
        insert={insert}
        edit={edit}
        groupBlockIntent={groupBlockIntent}
        symbolToGroupBlockIntent={(symbol: string) =>
          setGroupBlockIntent(getGroupBlockIntentData(symbol))
        }
      />
      {action === "groupEdit" ? (
        <GroupBlockInsert
          blocksData={splitMarkdownIntoBlocks(word.slice(1, -1))}
          groupBlockIntent={groupBlockIntent}
          enter={(blocksData: BlockType[]) => {
            edit({
              type: "group",
              content: formatContent.groupBlock(groupBlockIntent, blocksData),
            });
            setAction("standard");
          }}
        />
      ) : (
        <GroupPrimitiveBlock
          ref={buttonRef}
          blockIndex={blockIndex}
          selected={selected}
          text={word}
          action={action}
          onClick={() => {
            setGroupBlockIntent(getGroupBlockIntentData(word.split("")[0]));
            setAction("groupEdit");
          }}
          onKeyDown={(e) => {
            if (e.metaKey) focusOnCaret();
            switch (e.key) {
              case "c":
                copy(word);
                break;
              case "Backspace" || "Delete":
                backspace(setBlocks, blockIndex);
                break;
              case "/":
                setAction("insert");
                break;
              case "h":
                selectBlock();
                break;
              case "x":
                copy(word);
                backspace(setBlocks, blockIndex);
                focusOnCaret();
                break;
              case "k":
                focusOnCaret();
                break;
            }
          }}
        />
      )}
    </>
  );
};

export default GroupBlock;
