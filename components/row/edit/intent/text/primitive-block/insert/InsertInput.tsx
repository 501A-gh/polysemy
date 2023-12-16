import Suggest, { SuggestProps } from "@/components/ui/Suggest";
import {
  ActionTypes,
  filterWord,
  updateBlock,
} from "@/util/helper/globalUtilities";
import React, { useEffect, useRef, useState } from "react";
import BlockOutput from "../../BlockOutput";
import { BlockType } from "../../TextInterpreter";
import Tag from "@/components/ui/Tag";

export interface InsertInputProps {
  insert: (newBlockObj: BlockType) => void;
  setAction: React.Dispatch<React.SetStateAction<ActionTypes>>;
  symbolToGroupBlockIntent: (symbol: string) => void;
}

const InsertInput: React.FC<InsertInputProps> = ({
  insert,
  setAction,
  symbolToGroupBlockIntent,
}) => {
  const [blocks, setBlocks] = useState<BlockType[]>([]);
  const [selectBlocks, setSelectBlocks] = useState<number[]>([]);

  const [insertValue, setInsertValue] = useState<string>("");
  const [suggestion, setSuggestion] = useState<SuggestProps["suggestion"]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const focusOnInsertInputRef = () => {
    if (inputRef.current != null) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    if (insertValue === " " || insertValue === "/") setInsertValue("");
  }, [insertValue]);

  return (
    <>
      <Tag>Insert</Tag>
      <BlockOutput
        blocks={blocks}
        setBlocks={setBlocks}
        selectBlocks={selectBlocks}
        setSelectBlocks={setSelectBlocks}
        focusOnCaret={focusOnInsertInputRef}
      />
      <input
        autoFocus
        placeholder="Type ..."
        ref={inputRef}
        value={insertValue}
        onChange={(e) => {
          setInsertValue(e.target.value);
          switch (e.target.value.split("")[0]) {
            case "(":
              setAction("groupInsert");
              symbolToGroupBlockIntent("(");
              setInsertValue("");
              break;
            case "'":
              setAction("groupInsert");
              symbolToGroupBlockIntent("'");
              setInsertValue("");
              break;
            case "[":
              setAction("groupInsert");
              symbolToGroupBlockIntent("[");
              setInsertValue("");
              break;
            default:
              const results = filterWord(e.target.value);
              setSuggestion(results);
          }
        }}
        onKeyDown={(e) => {
          if (e.key === " ") {
            updateBlock(setBlocks, blocks?.length, "insert", {
              type: "word",
              content: insertValue,
            });
            setTimeout(() => setInsertValue(""), 1);
          }
          if (e.key === "Enter") {
            blocks.reverse().map((blockObj: BlockType) => insert(blockObj));
            setAction("standard");
          }
        }}
      />
      <Suggest
        input={insertValue}
        setInput={setInsertValue}
        suggestion={suggestion}
        focusOnClick={focusOnInsertInputRef}
        className={`btn-word`}
      />
      <button
        className={`btn btn-standard`}
        onClick={() => setAction("standard")}
      >
        Done
      </button>
    </>
  );
};

export default InsertInput;
