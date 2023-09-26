import React, { useRef, useState } from "react";
import { GroupBlockDictType } from "@/util/data/groupBlockDict";
import {
  BlockModeTypes,
  getGroupBlockIntentData,
} from "@/util/helper/blockUtilities";
import Command from "@/components/ui/Command";
import BlockEdit from "./BlockEdit";
import PrimitiveBlockInsert from "../primitive-block/insert/PrimitiveBlockInsert";
import PrimitiveBlock from "../primitive-block/PrimitiveBlock";
import {
  copy,
  isEndOfHighlight,
  sentence,
} from "@/util/helper/globalUtilities";
import TextFxBar from "@/components/ui/highlight/text-layer/TextAction";

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
      <PrimitiveBlockInsert
        blockMode={blockMode}
        blockIndex={blockIndex}
        selected={selected}
        insert={insert}
        createBlockMode={createBlockMode}
        updateBlockMode={updateBlockMode}
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
