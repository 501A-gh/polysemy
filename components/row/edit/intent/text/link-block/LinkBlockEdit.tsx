import React, { useRef, useState } from "react";
import { BlockType } from "../TextInterpreter";
import { ActionTypes, updateBlock } from "@/util/helper/blockUtilities";
import BlockOutput from "../BlockOutput";
import { CheckIcon } from "@radix-ui/react-icons";
import { notify } from "@/components/ui/notify/Notify";

const LinkBlockEdit: React.FC<{
  blocksData: BlockType[];
  url: string;
  setAction: React.Dispatch<React.SetStateAction<ActionTypes>>;
  enter: (newBlocksData: BlockType[]) => void;
}> = ({ blocksData, setAction, url, enter, ...props }) => {
  const caretRef = useRef<HTMLInputElement>(null);
  const focusOnCaret = () => {
    if (caretRef.current != null) {
      caretRef.current.focus();
    }
  };

  const [input, setInput] = useState<string>("");
  const [blocks, setBlocks] = useState<BlockType[]>(blocksData);
  const [linkBlockUrl, setLinkBlockUrl] = useState<string>(url);
  const [selectBlocks, setSelectBlocks] = useState<number[]>([]);

  const enterWhenSatisfied = () =>
    input && linkBlockUrl ? enter(blocks) : notify("Missing link URL", "alert");

  return (
    <>
      <BlockOutput
        blocks={blocks}
        setBlocks={setBlocks}
        selectBlocks={selectBlocks}
        setSelectBlocks={setSelectBlocks}
        focusOnCaret={focusOnCaret}
      />
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
              updateBlock(setBlocks, blocks?.length, "insert", {
                type: "word",
                content: input,
              });
              setTimeout(() => setInput(""), 1);
              break;
            case "Enter":
              enterWhenSatisfied();
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
              enterWhenSatisfied();
              break;
          }
        }}
      />
      <button className={`btn-standard`} onClick={() => enter(blocks)}>
        <CheckIcon />
        Done
      </button>
    </>
  );
};

export default LinkBlockEdit;
