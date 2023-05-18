import React, { useRef, useState } from "react";
import { setTimeout } from "timers";
import Suggest, { SuggestProps } from "../../../Suggest";
import Command from "../../../Command";
import { VariantProps, cva } from "class-variance-authority";
import words from "@/util/data/words";
import { StackType } from "@/app/(editor)/Editor";

const blockButton = cva("button", {
  variants: {
    intent: {
      standard: [
        "text-gray-600",
        "dark:text-gray-400",

        "focus:bg-gray-200",
        "dark:focus:bg-gray-800 ",
        "focus:text-black",
        "focus:dark:text-white",
      ],
      command: ["text-gray-400", "dark:text-gray-700", "animate-pulse"],
      edit: ["text-gray-400", "dark:text-gray-700", "animate-bounce"],
      highlight: [
        "rounded-none",
        "text-gray-900",
        "bg-green-300",
        "focus:bg-green-400",
      ],
      blur: ["blur-md"],
    },
  },
  defaultVariants: {
    intent: "standard",
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof blockButton> {
  icon?: JSX.Element;
}

const BlockButton: React.FC<ButtonProps> = ({
  className,
  intent,
  icon,
  ...props
}) => (
  <button
    className={
      blockButton({ intent, className }) +
      ` 
        border
        border-none
        outline-none
        cursor-pointer
        select-none
        font-sans
        
        px-0.5
        py-0.25
        my-0.5
      `
    }
    {...props}
  >
    {icon}
    {props.children}
  </button>
);

interface BlockTypes extends React.HTMLProps<HTMLButtonElement> {
  blockIndex: number;
  rowIndex: number;
  highlightPoint: number[];
  setHighlightPoint: any;
  stack: StackType[];
  setStack: any;
  word: string;
}

const Block: React.FC<BlockTypes> = ({
  blockIndex,
  rowIndex,
  highlightPoint,
  setHighlightPoint,
  stack,
  setStack,
  word,
}) => {
  const editInputRef = useRef<HTMLInputElement>(null);
  const focusOnEditInputRef = () => {
    if (editInputRef.current != null) {
      editInputRef.current.focus();
      console.log("bruh");
    }
  };
  // const [focus, setFocus] = useState<boolean>(false);

  const [currentMode, setCurrentMode] = useState<any>();

  const [editValue, setEditValue] = useState<SuggestProps["input"]>("");
  const [insertValue, setInsertValue] = useState<string>("");

  const [suggestion, setSuggestion] = useState<SuggestProps["suggestion"]>([]);

  const copy = () => navigator.clipboard.writeText(word);

  const backspace = (deletingIndex: number) => {
    setStack((prevItems: StackType[]) => {
      const updatedItems = [...prevItems];
      updatedItems[rowIndex].data.text = [...prevItems[rowIndex].data.text];
      updatedItems[rowIndex].data.text.splice(deletingIndex, 1);
      return updatedItems;
    });
  };

  const edit = (newValue: string) => {
    setStack((prevItems: StackType[]) => {
      const updatedItems = [...prevItems];
      updatedItems[rowIndex].data.text = [...prevItems[rowIndex].data.text];
      updatedItems[rowIndex].data.text[blockIndex] = newValue;
      return updatedItems;
    });
  };

  const insert = (newValue: string) => {
    setStack((prevItems: StackType[]) => {
      const updatedItems = [...prevItems];
      const updatedRow = [...prevItems[rowIndex].data.text];
      updatedRow.splice(blockIndex, 0, newValue);
      updatedItems[rowIndex].data.text = updatedRow;
      return updatedItems;
    });
  };

  let highlightIndex: number[] = [];
  let sortedHighlightPoint = highlightPoint.sort();
  let highlightPointStart: number = sortedHighlightPoint[0];
  let highlightPointEnd: number =
    sortedHighlightPoint[highlightPoint.length - 1];

  for (let i = highlightPointStart; i < highlightPointEnd + 1; i++) {
    highlightIndex.push(i);
  }

  return (
    <>
      {currentMode === "insert" && (
        <input
          autoFocus
          placeholder="Insert ..."
          value={insertValue}
          onChange={(e) => setInsertValue(e.target.value)}
          onBlur={() => setCurrentMode("insert")}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              insertValue
                .split(/\W+/)
                .reverse()
                .map((w: string) => insert(w));
              setInsertValue("");
              setCurrentMode("standard");
            }
          }}
        />
      )}

      <BlockButton
        intent={
          highlightIndex.includes(blockIndex)
            ? "highlight"
            : currentMode === "insert"
            ? "standard"
            : currentMode
        }
        onClick={() => {
          setCurrentMode("edit");
          setTimeout(() => setEditValue(""), 1);
        }}
        onKeyDown={(e) => {
          switch (e.key) {
            case "o":
              currentMode === "command"
                ? setCurrentMode("standard")
                : setCurrentMode("command");
              break;
            case "c":
              copy();
              break;
            case "Backspace" || "Delete":
              backspace(blockIndex);
              break;
            case "j":
              backspace(blockIndex - 1);
              break;
            case "r":
              setCurrentMode("edit");
              setTimeout(() => setEditValue(""), 1);
              break;
            case "/":
              setCurrentMode("insert");
              setTimeout(() => setInsertValue(""), 1);
              break;
            case "h":
              if (highlightIndex.includes(blockIndex)) {
                setHighlightPoint([]);
              } else if (highlightPoint.length == 2) {
                alert("cannot highlight");
              } else {
                setHighlightPoint([...highlightPoint, blockIndex]);
              }
              break;
            case "x":
              copy();
              backspace(blockIndex);
              break;
          }
        }}
      >
        {word}
      </BlockButton>

      {currentMode === "edit" && (
        <Suggest
          // onFocus={setFocus}
          inputRef={editInputRef}
          input={editValue}
          focusOnInput={focusOnEditInputRef}
          setInput={setEditValue}
          suggestion={suggestion}
        >
          <input
            autoFocus
            ref={editInputRef}
            onFocus={() => {
              setCurrentMode("edit");
              // setFocus(true);
            }}
            placeholder="Replace ..."
            value={editValue}
            onChange={(e) => {
              setEditValue(e.target.value);
              const results = words.filter((wrd: any) => {
                if (e.target.value === "") return wrd;
                return wrd.toLowerCase().includes(e.target.value.toLowerCase());
              });
              setSuggestion(results);
            }}
            onKeyDown={(e) => {
              if (e.key === " ") {
                edit(editValue);
                setCurrentMode("standard");
              }
            }}
          />
        </Suggest>
      )}
      {currentMode === "command" && (
        <Command
          word={word}
          blockIndex={blockIndex}
          insert={insert}
          backspace={backspace}
          setCurrentMode={setCurrentMode}
        />
      )}
      {/* {highlightPoint.length === 2 &&
        sortedHighlightPoint[highlightPoint.length - 1] === index && (
          <Highlight
            stack={stack}
            setStack={setStack}
            text={text}
            backspace={backspace}
            highlightIndex={highlightIndex}
            highlightPoint={highlightPoint}
            setHighlightPoint={setHighlightPoint}
            setCurrentMode={setCurrentMode}
          />
        )} */}
    </>
  );
};

export default Block;
