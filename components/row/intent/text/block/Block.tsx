import React, { useRef, useState } from "react";
import GroupBlockEdit from "../group-block/GroupBlockEdit";
import { GroupBlockDictType, groupBlockDict } from "@/util/data/groupBlockDict";
import InputSpace from "../primitive-block/insert/InsertInputSpace";
import { copy, getGroupBlockIntentData } from "@/util/helper/blockUtilities";
import InsertInput from "../primitive-block/insert/InsertInput";
import Command from "@/components/ui/Command";
import PrimitiveBlock, {
  BlockModeTypes,
} from "../primitive-block/PrimitiveBlock";
import BlockEdit from "./BlockEdit";
import GroupBlockInsert from "../group-block/GroupBlockInsert";
import GroupBlockWrapper from "../group-block/GroupBlockWrapper";

interface BlockProps {
  blockIndex: number;
  selected: number[];
  selectBlock: () => void;
  word: string;
  focusOnCaret: () => void;
  insert: (input: string) => void;
  edit: (input: string) => void;
  backspace: () => void;
  blockMode: any;
  createBlockMode: () => void;
  updateBlockMode: (mode: BlockModeTypes) => void;
}

const Block: React.FC<BlockProps> = ({
  blockIndex,
  selected,
  selectBlock,
  word,
  focusOnCaret,
  insert,
  edit,
  backspace,
  blockMode,
  createBlockMode,
  updateBlockMode,
}) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const focusOnBlock = () =>
    setTimeout(() => {
      if (buttonRef.current) {
        buttonRef.current.focus();
      }
    }, 1);

  const [groupBlockIntent, setGroupBlockIntent] =
    useState<GroupBlockDictType>();

  return (
    <>
      {blockMode === "groupInsert" ? (
        <GroupBlockInsert
          groupBlockIntent={groupBlockIntent}
          updateBlockMode={updateBlockMode}
          insertGroupBlock={insert}
          groupBlockText={""}
        />
      ) : (
        <>
          {blockMode === "insert" ? (
            <InsertInput
              insert={insert}
              createBlockMode={createBlockMode}
              updateBlockMode={updateBlockMode}
              symbolToGroupBlockIntent={(symbol: string) =>
                setGroupBlockIntent(getGroupBlockIntentData(symbol))
              }
            />
          ) : (
            <InputSpace
              selected={selected}
              blockIndex={blockIndex}
              onClick={() => updateBlockMode("insert")}
            />
          )}
        </>
      )}

      <PrimitiveBlock
        ref={buttonRef}
        blockIndex={blockIndex}
        selected={selected}
        text={word}
        blockMode={blockMode}
        onClick={() => updateBlockMode("edit")}
        onKeyDown={(e) => {
          if (e.metaKey) focusOnCaret();
          switch (e.key) {
            case "o":
              focusOnBlock();
              blockMode === "command"
                ? updateBlockMode("standard")
                : updateBlockMode("command");
              break;
            case "c":
              copy(word);
              break;
            case "Backspace" || "Delete":
              backspace();
              break;
            case "/":
              updateBlockMode("insert");
              break;
            case "h":
              selectBlock();
              break;
            case "x":
              copy(word);
              backspace();
              focusOnCaret();
              break;
            case "k":
              focusOnCaret();
              break;
          }
        }}
      />

      {blockMode === "edit" && (
        <BlockEdit
          edit={edit}
          focusOnBlock={focusOnBlock}
          updateBlockMode={updateBlockMode}
        />
      )}

      {blockMode === "command" && (
        <Command
          word={word}
          blockIndex={blockIndex}
          insert={insert}
          backspace={backspace}
          setCurrentMode={updateBlockMode}
          focusOnClick={focusOnBlock}
        />
      )}
    </>
  );
};

export default Block;
