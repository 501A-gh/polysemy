import Suggest, { SuggestProps } from "@/components/ui/Suggest";
import { filterWord } from "@/util/helper/blockUtilities";
import React, { useRef, useState } from "react";
import { BlockModeTypes } from "../primitive-block/PrimitiveBlock";

interface BlockEditProps {
  edit: (input: string) => void;
  updateBlockMode: (mode: BlockModeTypes) => void;
  focusOnBlock: () => void;
}

const BlockEdit: React.FC<BlockEditProps> = ({
  edit,
  updateBlockMode,
  focusOnBlock,
}) => {
  const [editValue, setEditValue] = useState<string>("");
  const [suggestion, setSuggestion] = useState<SuggestProps["suggestion"]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const focusOnEditInputRef = () => {
    if (inputRef.current != null) {
      inputRef.current.focus();
    }
  };

  return (
    <>
      <input
        autoFocus
        placeholder="Replace ..."
        ref={inputRef}
        onFocus={() => updateBlockMode("edit")}
        value={editValue}
        onChange={(e) => {
          setEditValue(e.target.value);
          const results = filterWord(e.target.value);
          setSuggestion(results);
        }}
        onKeyDown={(e) => {
          if (e.key === " ") {
            edit(editValue);
            updateBlockMode("standard");
            focusOnBlock();
          }
        }}
        className={`animate-show duration-700`}
      />
      <Suggest
        input={editValue}
        setInput={setEditValue}
        suggestion={suggestion}
        focusOnClick={focusOnEditInputRef}
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

export default BlockEdit;
