import React, { useRef, useState } from "react";
import { BlockModeTypes } from "../primitive-block/PrimitiveBlock";
import { GroupBlockDictType } from "@/util/data/groupBlockDict";
import PrimitiveBlockInsert from "../primitive-block/insert/PrimitiveBlockInsert";
import { getGroupBlockIntentData } from "@/util/helper/blockUtilities";

interface LinkBlockProps {
  blockIndex: number;
  selected: number[];
  selectBlock: () => void;
  word: string;
  focusOnCaret: () => void;
  insert: (input: string) => void;
  edit: (input: string) => void;
  backspace: () => void;
  blockMode: BlockModeTypes;
  createBlockMode: () => void;
  updateBlockMode: (mode: BlockModeTypes) => void;
}

const LinkBlock: React.FC<LinkBlockProps> = ({
  blockIndex,
  selected,
  selectBlock,
  word,
  focusOnCaret,
  insert,
  edit,
  backspace,
  blockMode,
  updateBlockMode,
  createBlockMode,
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

      {blockMode === "groupEdit" ? (
        <GroupBlockEdit
          groupBlockIntent={groupBlockIntent}
          updateBlockMode={updateBlockMode}
          editGroupBlock={(text: string) => edit(text)}
          groupBlockText={word}
        />
      ) : (
        <PrimitiveBlock
          ref={buttonRef}
          blockIndex={blockIndex}
          selected={selected}
          text={word}
          blockMode={blockMode}
          onClick={() => {
            console.log(word);
            setGroupBlockIntent(getGroupBlockIntentData(word.split("")[0]));
            updateBlockMode("groupEdit");
          }}
          onKeyDown={(e) => {
            if (e.metaKey) focusOnCaret();
            switch (e.key) {
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
      )}
    </>
  );
};

export default LinkBlock;
