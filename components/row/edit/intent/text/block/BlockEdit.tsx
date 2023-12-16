import Suggest, { SuggestProps } from "@/components/ui/Suggest";
import React, { useRef, useState } from "react";
import { BlockType } from "../TextInterpreter";
import { ActionTypes, filterWord } from "@/util/helper/globalUtilities";

interface BlockEditProps {
  edit: (blockObj: BlockType) => void;
  setAction: React.Dispatch<React.SetStateAction<ActionTypes>>;
  focusOnBlock: () => void;
}

const BlockEdit: React.FC<BlockEditProps> = ({
  edit,
  setAction,
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
        onFocus={() => setAction("edit")}
        value={editValue}
        onChange={(e) => {
          setEditValue(e.target.value);
          const results = filterWord(e.target.value);
          setSuggestion(results);
        }}
        onKeyDown={(e) => {
          if (e.key === " ") {
            edit({
              type: "word",
              content: editValue,
            });
            setAction("standard");
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
        onClick={() => setAction("standard")}
      >
        Done
      </button>
    </>
  );
};

export default BlockEdit;
