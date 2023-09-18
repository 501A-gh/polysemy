import { BlockModeTypes } from "@/util/helper/blockUtilities";
import React, { useRef, useState } from "react";
import Block from "../block/Block";
import {
  createGroupBlockModeAtIndex,
  groupBackspace,
  groupEdit,
  groupInsert,
  updateGroupBlockModeAtIndex,
} from "@/util/helper/groupBlockUtilities";
import { selectBlockIndex } from "@/util/helper/globalUtilities";

interface LinkBlockEditProps {
  updateBlockMode: (mode: BlockModeTypes) => void;
  editLinkBlock: (text: string) => void;
  text: string;
  url: string;
}

const LinkBlockEdit: React.FC<LinkBlockEditProps> = ({
  updateBlockMode,
  editLinkBlock,
  text,
  url,
  ...props
}) => {
  const caretRef = useRef<HTMLInputElement>(null);
  const focusOnCaret = () => {
    if (caretRef.current != null) {
      caretRef.current.focus();
    }
  };

  const [input, setInput] = useState<string>("");
  const [linkBlockUrl, setLinkBlockUrl] = useState<string>(url);
  const [linkBlock, setLinkBlock] = useState<string[]>(
    text ? text.split(" ") : []
  );

  const [selectBlocks, setSelectBlocks] = useState<number[]>([]);

  const editAndSave = () => {
    editLinkBlock(`[${linkBlock.join(" ")}](${linkBlockUrl})`);
    updateBlockMode("standard");
  };

  const linkBlockModeOriginal = new Array(linkBlock.length).fill("standard");
  const [linkBlockMode, setLinkBlockMode] = useState(linkBlockModeOriginal);

  return (
    <>
      {linkBlock.length > 0 &&
        linkBlock.map((word: string, i: number) => (
          <Block
            key={i}
            blockIndex={i}
            selected={selectBlocks}
            selectBlock={() =>
              selectBlockIndex(i, selectBlocks, setSelectBlocks)
            }
            word={word}
            focusOnCaret={() => focusOnCaret()}
            backspace={() => groupBackspace(i, linkBlock, setLinkBlock)}
            insert={(input: string) =>
              groupInsert(input, i, linkBlock, setLinkBlock)
            }
            edit={(input: string) =>
              groupEdit(input, i, linkBlock, setLinkBlock)
            }
            blockMode={linkBlockMode[i]}
            createBlockMode={() =>
              createGroupBlockModeAtIndex(i, linkBlockMode, setLinkBlockMode)
            }
            updateBlockMode={(mode: BlockModeTypes) =>
              updateGroupBlockModeAtIndex(
                i,
                mode,
                linkBlockMode,
                setLinkBlockMode
              )
            }
          />
        ))}
      <input
        autoFocus
        placeholder="Text"
        className={`link-input`}
        value={input}
        ref={caretRef}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          switch (e.key) {
            case " ":
              groupInsert(input, linkBlockMode.length, linkBlock, setLinkBlock);
              createGroupBlockModeAtIndex(
                linkBlockMode.length,
                linkBlockMode,
                setLinkBlockMode
              );
              setTimeout(() => setInput(""), 1);
              break;
            case "Enter":
              editAndSave();
              break;
          }
        }}
      />
      <input
        placeholder="URL"
        className={`link-input`}
        value={linkBlockUrl}
        onChange={(e) => setLinkBlockUrl(e.target.value)}
        onKeyDown={(e) => {
          switch (e.key) {
            case "Enter":
              editAndSave();
              break;
          }
        }}
      />
      <button className={`btn btn-standard`} onClick={() => editAndSave()}>
        Done
      </button>
    </>
  );
};

export default LinkBlockEdit;
