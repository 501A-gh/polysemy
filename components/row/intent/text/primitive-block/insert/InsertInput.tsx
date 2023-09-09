import Suggest, { SuggestProps } from "@/components/ui/Suggest";
import { filterWord } from "@/util/helper/blockUtilities";
import React, { useEffect, useRef, useState } from "react";
import { BlockModeTypes } from "../PrimitiveBlock";

export interface InsertInputProps {
  insert: (input: string) => void;
  createBlockMode: () => void;
  updateBlockMode: (mode: BlockModeTypes) => void;
  symbolToGroupBlockIntent: (symbol: string) => void;
}

const InsertInput: React.FC<InsertInputProps> = ({
  insert,
  createBlockMode,
  updateBlockMode,
  symbolToGroupBlockIntent,
}) => {
  const [insertValue, setInsertValue] = useState<string>("");
  const [suggestion, setSuggestion] = useState<SuggestProps["suggestion"]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const focusOnInsertInputRef = () => {
    if (inputRef.current != null) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    if (insertValue === " " || insertValue === "/") {
      setInsertValue("");
    }
  }, [insertValue]);

  return (
    <>
      <input
        autoFocus
        placeholder="Type ..."
        ref={inputRef}
        value={insertValue}
        onChange={(e) => {
          setInsertValue(e.target.value);
          switch (e.target.value.split("")[0]) {
            case "(":
              updateBlockMode("groupInsert");
              symbolToGroupBlockIntent("(");
              setInsertValue("");
              break;
            case "'":
              updateBlockMode("groupInsert");
              symbolToGroupBlockIntent("'");
              setInsertValue("");
              break;
            case "[":
              updateBlockMode("groupInsert");
              symbolToGroupBlockIntent("[");
              setInsertValue("");
              break;
          }
          const results = filterWord(e.target.value);
          setSuggestion(results);
        }}
        onKeyDown={(e) => {
          if (e.key === " ") {
            insert(insertValue);
            createBlockMode();
            setTimeout(() => setInsertValue(""), 1);
          }
          if (e.key === "Enter") {
            updateBlockMode("standard");
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
        onClick={() => updateBlockMode("standard")}
      >
        Done
      </button>
    </>
  );
};

export default InsertInput;
