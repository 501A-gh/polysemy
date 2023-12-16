import React, { useRef, useState } from "react";
import { GroupBlockDictType } from "@/util/data/groupBlockDict";
import PrimitiveBlockInsert from "../primitive-block/insert/PrimitiveBlockInsert";
import {
  ActionTypes,
  backspace,
  copy,
  formatContent,
  getGroupBlockIntentData,
  splitMarkdownLink,
  updateBlock,
} from "@/util/helper/globalUtilities";
import LinkBlockEdit from "./LinkBlockEdit";
import LinkPrimitiveBlock from "../primitive-block/LinkPrimitiveBlock";
import { CopyIcon, ExternalLinkIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import RadixPopover from "@/components/ui/RadixPopover";
import { Tweet } from "@/components/tweet/Tweet";
import { BlockType, splitMarkdownIntoBlocks } from "../TextInterpreter";
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

  const [action, setAction] = useState<ActionTypes>("standard");
  const linkData = splitMarkdownLink(word);

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
      {action === "linkEdit" ? (
        <LinkBlockEdit
          blocksData={splitMarkdownIntoBlocks(word.slice(1, -1))}
          url={`${linkData?.url}`}
          enter={(blocksData: BlockType[]) => {
            edit({
              type: "link",
              content: formatContent.linkBlock(`${linkData?.url}`, blocksData),
            });
            setAction("standard");
          }}
          setAction={setAction}
        />
      ) : (
        <LinkPrimitiveBlock
          ref={buttonRef}
          blockIndex={blockIndex}
          selected={selected}
          text={`${linkData?.text}`}
          action={action}
          onClick={() => {
            setGroupBlockIntent(getGroupBlockIntentData(word.split("")[0]));
            setAction("linkEdit");
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
              case "o":
                focusOnBlock();
                action === "command"
                  ? setAction("standard")
                  : setAction("command");
                break;
            }
          }}
        />
      )}
      {action === "command" && (
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
            onClick={() => window.open(`${linkData?.url}`, "_blank")}
          >
            <ExternalLinkIcon />
            Open Link
          </button>
          <button
            className={`btn btn-standard`}
            onClick={() => copy(`${linkData?.url}`)}
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
