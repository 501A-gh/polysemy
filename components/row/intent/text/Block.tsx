import React, { useRef, useState } from "react";
import { setTimeout } from "timers";
import words from "@/util/data/words";
import { StackType } from "@/app/(editor)/Editor";
import Command from "@/components/ui/Command";
import Suggest, { SuggestProps } from "@/components/ui/Suggest";

interface BlockTypes {
  blockIndex: number;
  rowIndex: number;
  selected: number[];
  selectBlock: any;
  stack: StackType[];
  setStack: any;
  word: string;
  focusOnCaret: any;
}

const Block: React.FC<BlockTypes> = ({
  blockIndex,
  rowIndex,
  selected,
  selectBlock,
  stack,
  setStack,
  word,
  focusOnCaret,
  ...props
}) => {
  const editInputRef = useRef<HTMLInputElement>(null);
  const focusOnEditInputRef = () => {
    if (editInputRef.current != null) {
      editInputRef.current.focus();
      console.log("bruh");
    }
  };

  const [currentMode, setCurrentMode] = useState<
    "standard" | "edit" | "insert" | "command"
  >();

  let blockStyle:
    | "block-standard"
    | "block-edit"
    // | "block-insert"
    | "block-command";
  switch (currentMode) {
    case "edit":
      blockStyle = "block-edit";
      break;
    case "insert":
      blockStyle = "block-standard";
      break;
    case "command":
      blockStyle = "block-command";
      break;
    default:
      blockStyle = "block-standard";
      break;
  }

  const [editValue, setEditValue] = useState<SuggestProps["input"]>("");
  const [insertValue, setInsertValue] = useState<string>("");

  const [suggestion, setSuggestion] = useState<SuggestProps["suggestion"]>([]);

  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const focusOnBlock = () => {
    setTimeout(() => {
      if (buttonRef.current) {
        buttonRef.current.focus();
      }
    }, 1);
  };

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
              focusOnBlock();
            }
          }}
        />
      )}

      <button
        type="button"
        ref={buttonRef}
        className={`block ${
          selected.includes(blockIndex) ? "block-highlight" : blockStyle
        }`}
        onClick={() => {
          setCurrentMode("edit");
          setTimeout(() => setEditValue(""), 1);
        }}
        onKeyDown={(e) => {
          if (e.metaKey) {
            focusOnCaret();
          }
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
              selectBlock();
              break;
            case "x":
              copy();
              backspace(blockIndex);
              focusOnCaret();
              break;
          }
        }}
      >
        {word}
      </button>

      {currentMode === "edit" && (
        <Suggest
          input={editValue}
          setInput={setEditValue}
          suggestion={suggestion}
          focusOnClick={focusOnEditInputRef}
        >
          <input
            autoFocus
            ref={editInputRef}
            onFocus={() => {
              setCurrentMode("edit");
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
                focusOnBlock();
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
          focusOnClick={focusOnBlock}
        />
      )}
    </>
  );
};

export default Block;
