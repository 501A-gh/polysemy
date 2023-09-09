import React, { useState } from "react";
import Suggest, { SuggestProps } from "../Suggest";
import { BlockIntentType, filterWord } from "@/util/helper/blockUtilities";

interface PrimitiveCaretProps {
  inputRef: React.Ref<HTMLInputElement>;
  focusOnCaret: () => void;
  insert: (text: string) => void;
  createBlockMode: () => void;
  setBlockIntent: (intent: BlockIntentType) => void;
  setGroupBlockIntent: (symbol: string) => void;
}

const PrimitiveCaret: React.FC<PrimitiveCaretProps> = ({
  inputRef,
  focusOnCaret,
  insert,
  createBlockMode,
  setBlockIntent,
  setGroupBlockIntent,
}) => {
  const [focus, setFocus] = useState<boolean>(false);
  const [input, setInput] = useState<SuggestProps["input"]>("");
  const [suggestion, setSuggestion] = useState<SuggestProps["suggestion"]>([]);

  return (
    <>
      <input
        autoFocus
        spellCheck
        ref={inputRef}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onPaste={(e) => {
          e.preventDefault();
          e.clipboardData
            .getData("text")
            .split(/\W+/)
            .map((word: string) => insert(word));
        }}
        className={`input-caret`}
        placeholder={focus ? "Type ..." : ""}
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          switch (e.target.value.split("")[0]) {
            case "(":
              setBlockIntent("group");
              setGroupBlockIntent("(");
              setInput("");
              break;
            case "'":
              setBlockIntent("group");
              setGroupBlockIntent("'");
              setInput("");
              break;
            case "[":
              setBlockIntent("group");
              setGroupBlockIntent("[");
              setInput("");
              break;
          }
          const results = filterWord(e.target.value);
          setSuggestion(results);
        }}
        onKeyDown={(e) => {
          setFocus(true);
          if (input.split("").length > 0 && e.key === " ") {
            insert(input);
            createBlockMode();
            setTimeout(() => setInput(""), 1);
          }
        }}
      />
      <Suggest
        input={input}
        setInput={setInput}
        suggestion={suggestion}
        focusOnClick={focusOnCaret}
        className={`btn-word`}
      />
    </>
  );
};

export default PrimitiveCaret;
