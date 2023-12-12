import React, { useRef, useState } from "react";
import { GroupBlockDictType } from "@/util/data/groupBlockDict";
import {
  ActionTypes,
  backspace,
  copy,
  getGroupBlockIntentData,
  updateBlock,
} from "@/util/helper/blockUtilities";
import Command from "@/components/ui/Command";
import BlockEdit from "./BlockEdit";
import PrimitiveBlockInsert from "../primitive-block/insert/PrimitiveBlockInsert";
import PrimitiveBlock from "../primitive-block/PrimitiveBlock";
import { BlockType } from "../TextInterpreter";
import { GeneralBlockProps } from "../BlockOutput";

const Block: React.FC<GeneralBlockProps> = ({
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
      <PrimitiveBlock
        ref={buttonRef}
        blockIndex={blockIndex}
        selected={selected}
        text={word}
        action={action}
        onClick={() => setAction("edit")}
        onKeyDown={(e) => {
          if (e.metaKey) focusOnCaret();
          switch (e.key) {
            case "o":
              focusOnBlock();
              action === "command"
                ? setAction("standard")
                : setAction("command");
              break;
            case "c":
              copy(word);
              break;
            case "Backspace" || "Delete":
              backspace(setBlocks, blockIndex);
              break;
            case "/":
              {
                /* updateBlockMode("insert"); */
              }
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

      {action === "edit" && (
        <BlockEdit
          edit={edit}
          focusOnBlock={focusOnBlock}
          setAction={setAction}
        />
      )}

      {/* {action === "command" && (
        <Command
          word={word}
          blockIndex={blockIndex}
          insert={insert}
          backspace={backspace(setBlocks, blockIndex)}
          focusOnClick={focusOnBlock}
        />
      )} */}
      {/* setCurrentMode={updateBlockMode} */}
    </>
  );
};

export default Block;
