import React, { useRef, useState } from "react";
import Suggest, { SuggestProps } from "./Suggest";
import words from "@/util/data/words";
import { StackType } from "@/app/(editor)/Editor";

interface CaretProps {
  rowIndex: number;
  stack: StackType[];
  setStack: any;
  inputRef: React.Ref<HTMLInputElement>;
  focusOnCaret: any;
}

const Caret: React.FC<CaretProps> = ({
  rowIndex,
  stack,
  setStack,
  inputRef,
  focusOnCaret,
}) => {
  const [focus, setFocus] = useState<boolean>(false);
  // const inputRef = useRef<HTMLInputElement>(null);

  const [input, setInput] = useState<SuggestProps["input"]>("");
  const [suggestion, setSuggestion] = useState<SuggestProps["suggestion"]>([]);

  const [insert, setInsert] = useState<boolean>(false);
  const [insertInput, setInsertInput] = useState<string>("");

  const addItemToEnd = (newValue: string): void => {
    setStack((prevStack: StackType[]) => {
      const updatedStack = [...prevStack];
      updatedStack[rowIndex].data.text.push(newValue);
      return updatedStack;
    });
  };

  return (
    <Suggest
      input={input}
      setInput={setInput}
      suggestion={suggestion}
      focusOnClick={focusOnCaret}
    >
      <div
        className={`
          flex items-center gap-0.25 
          my-0.5 ml-1
        `}
      >
        <input
          autoFocus
          spellCheck
          ref={inputRef}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onPaste={(e) => {
            e.preventDefault();
            alert("To paste switch to insert mode");
          }}
          className={
            `
            focus:outline-none
            rounded-sm
            w-24 h-fit
            p-0.5 m-0 mr-0.5
            font-mono text-sm
            border
            border-transparent
            bg-transparent 
            hover:bg-gray-900
            hover:border-gray-800
            focus:border-transparent
            text-orange-500
            placeholder:text-orange-500 ` + (insert && "w-0")
          }
          placeholder={focus ? "Type ..." : ""}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            const results = words.filter((wrd: any) => {
              if (e.target.value === "") return wrd;
              return wrd.toLowerCase().includes(e.target.value.toLowerCase());
            });
            setSuggestion(results);
          }}
          onKeyDown={(e) => {
            setFocus(true);
            if (e.metaKey && e.key == "i") {
              setInsert(true);
              setFocus(false);
            }
            if (input.split("").length > 0 && e.key === " ") {
              addItemToEnd(input);
              setTimeout(() => setInput(""), 1);
            }
          }}
        />
        {insert && (
          <input
            autoFocus
            placeholder="Insert ..."
            value={insertInput}
            onChange={(e) => setInsertInput(e.target.value)}
            onBlur={() => setInsert(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                insertInput
                  .split(/\W+/)
                  .map((word: string) => addItemToEnd(word));
                setInsertInput("");
                setInsert(false);
                setFocus(true);
              }
            }}
          />
        )}
      </div>
    </Suggest>
  );
};

export default Caret;
