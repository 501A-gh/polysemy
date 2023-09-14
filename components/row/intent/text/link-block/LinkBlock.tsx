import React, { useRef, useState } from "react";
import { GroupBlockDictType } from "@/util/data/groupBlockDict";
import PrimitiveBlockInsert from "../primitive-block/insert/PrimitiveBlockInsert";
import {
  BlockModeTypes,
  copy,
  getGroupBlockIntentData,
  splitMarkdownLink,
} from "@/util/helper/blockUtilities";
import LinkBlockEdit from "./LinkBlockEdit";
import LinkPrimitiveBlock from "../primitive-block/LinkPrimitiveBlock";
import { CopyIcon, ExternalLinkIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import RadixPopover from "@/components/ui/RadixPopover";
import { Tweet } from "@/components/tweet/Tweet";
import RadixDialog from "@/components/ui/RadixDialog";
import RadixHoverCard from "@/components/ui/RadixHoverCard";

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

  const result = splitMarkdownLink(word);

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
      {blockMode === "linkEdit" ? (
        <LinkBlockEdit
          updateBlockMode={updateBlockMode}
          editLinkBlock={(text: string) => edit(text)}
          text={result?.text ? result?.text : ""}
          url={result?.url ? result?.url : ""}
        />
      ) : (
        <LinkPrimitiveBlock
          ref={buttonRef}
          blockIndex={blockIndex}
          selected={selected}
          text={result?.text ? result?.text : ""}
          blockMode={blockMode}
          onClick={() => {
            setGroupBlockIntent(getGroupBlockIntentData(word.split("")[0]));
            updateBlockMode("linkEdit");
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
              case "o":
                focusOnBlock();
                blockMode === "command"
                  ? updateBlockMode("standard")
                  : updateBlockMode("command");
                break;
            }
          }}
        />
      )}
      {blockMode === "command" && (
        <>
          <RadixPopover
            title={"Tweet"}
            trigger={
              <button className={`btn btn-standard`}>
                <EyeOpenIcon />
                Glance
              </button>
            }
          >
            <Tweet id={"1701954745316041209"} />
          </RadixPopover>
          <button
            className={`btn btn-standard`}
            onClick={() => window.open(result?.url, "_blank")}
          >
            <ExternalLinkIcon />
            Open Link
          </button>
          <button
            className={`btn btn-standard`}
            onClick={() => copy(result?.url ? result?.url : "")}
          >
            <CopyIcon />
            Copy Link
          </button>
        </>
      )}
    </>
  );
};

export default LinkBlock;
