import React, { useRef, useState } from "react";
import { GroupBlockDictType } from "@/util/data/groupBlockDict";
import PrimitiveBlockInsert from "../primitive-block/insert/PrimitiveBlockInsert";
import {
  ModeTypes,
  backspace,
  getGroupBlockIntentData,
  splitMarkdownLink,
  updateBlock,
} from "@/util/helper/blockUtilities";
import LinkBlockEdit from "./LinkBlockEdit";
import LinkPrimitiveBlock from "../primitive-block/LinkPrimitiveBlock";
import { CopyIcon, ExternalLinkIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import RadixPopover from "@/components/ui/RadixPopover";
import { Tweet } from "@/components/tweet/Tweet";
import { copy } from "@/util/helper/globalUtilities";
import { BlockType } from "../TextInterpreter";
import { GeneralBlockProps } from "../BlockOutput";

const LinkBlock: React.FC<GeneralBlockProps> = ({
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

  const result = splitMarkdownLink(word);

  const [mode, setMode] = useState<ModeTypes>("standard");

  return (
    <>
      <PrimitiveBlockInsert
        mode={mode}
        setMode={setMode}
        blockIndex={blockIndex}
        selected={selected}
        insert={insert}
        edit={edit}
        groupBlockIntent={groupBlockIntent}
        symbolToGroupBlockIntent={(symbol: string) =>
          setGroupBlockIntent(getGroupBlockIntentData(symbol))
        }
      />
      {mode === "linkEdit" ? (
        <LinkBlockEdit
          setMode={setMode}
          edit={edit}
          text={result?.text ? result?.text : ""}
          url={result?.url ? result?.url : ""}
        />
      ) : (
        <LinkPrimitiveBlock
          ref={buttonRef}
          blockIndex={blockIndex}
          selected={selected}
          text={result?.text ? result?.text : ""}
          blockMode={mode}
          onClick={() => {
            setGroupBlockIntent(getGroupBlockIntentData(word.split("")[0]));
            setMode("linkEdit");
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
                setMode("insert");
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
              case "o":
                focusOnBlock();
                mode === "command" ? setMode("standard") : setMode("command");
                break;
            }
          }}
        />
      )}
      {mode === "command" && (
        <>
          <RadixPopover
            title={"Tweet"}
            size="large"
            trigger={
              <button className={`btn btn-standard`}>
                <EyeOpenIcon />
                Glance
              </button>
            }
          >
            <div className={`p-1`}>
              <Tweet id={"1701954745316041209"} />
            </div>
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
