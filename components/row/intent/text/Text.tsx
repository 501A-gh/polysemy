import React, { useEffect, useState } from "react";
import Block from "./Block";
import Caret from "@/components/ui/Caret";
import { StackType } from "@/app/(editor)/Editor";
import {
  ClipboardIcon,
  CounterClockwiseClockIcon,
  Pencil1Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import FunctionBar from "@/components/ui/FunctionBar";
import nlp from "compromise/three";

interface TextProps {
  rowIndex: number;
  stack: StackType[];
  setStack: any;
  caretRef: React.Ref<HTMLInputElement>;
  focusOnCaret: any;
}

const Text: React.FC<TextProps> = ({
  rowIndex,
  stack,
  setStack,
  caretRef,
  focusOnCaret,
}) => {
  const currentRow: StackType = stack[rowIndex];
  const data = currentRow.data.text;

  const [selectBlocks, setSelectBlocks] = useState<number[]>([]);
  const selectBlockIndex = (index: number) => {
    if (selectBlocks.length === 1 && index !== selectBlocks[0]) {
      const start = Math.min(index, selectBlocks[0]);
      const end = Math.max(index, selectBlocks[0]);
      const indexesInBetween = Array.from(
        { length: end - start + 1 },
        (_, i) => start + i
      );
      setSelectBlocks(indexesInBetween);
    } else {
      setSelectBlocks([index]);
    }
  };
  const exitSelect = () => {
    setSelectBlocks([]);
  };

  const backspace = (deletingIndex: number) => {
    setStack((prevItems: StackType[]) => {
      const updatedItems = [...prevItems];
      updatedItems[rowIndex].data.text = [...prevItems[rowIndex].data.text];
      updatedItems[rowIndex].data.text.splice(deletingIndex, 1);
      return updatedItems;
    });
  };

  const sentence = () => {
    let highlightedSectence: string[] = [];
    selectBlocks.forEach((i) => highlightedSectence.push(data[i]));
    return highlightedSectence.join(" ");
  };

  const copyRawText = () => {
    navigator.clipboard.writeText(sentence());
    exitSelect();
  };

  const backspaceMultiple = (array: number[]) => {
    array.reverse().forEach((i) => backspace(i));
    exitSelect();
  };

  const convertToPastTense = () => {
    const doc = nlp(sentence());
    doc.verbs().toPastTense();
    const pastTenseSentence = doc.text().split(/\W+/);
    pastTenseSentence.map((w: string, i: number) => {
      setStack((prevItems: StackType[]) => {
        const updatedItems = [...prevItems];
        const updatedRow = [...prevItems[rowIndex].data.text];
        updatedRow.splice(selectBlocks[i], 0, w);
        updatedItems[rowIndex].data.text = updatedRow;
        return updatedItems;
      });
    });

    const updatedSelectBlocks = selectBlocks.map((blockIndex) => {
      return blockIndex + pastTenseSentence.length;
    });

    backspaceMultiple(updatedSelectBlocks);
  };

  const options = [
    {
      icon: <ClipboardIcon />,
      name: "Copy raw text ",
      action: () => {
        copyRawText();
        focusOnCaret();
      },
    },
    {
      icon: <TrashIcon />,
      name: "Delete",
      action: () => {
        backspaceMultiple(selectBlocks);
        focusOnCaret();
      },
    },
  ];

  if (nlp(sentence()).has("#Verb")) {
    options.push({
      icon: <CounterClockwiseClockIcon />,
      name: "Past Tense",
      action: () => {
        convertToPastTense();
        focusOnCaret();
      },
    });
  }

  return (
    <>
      {data &&
        data.length > 0 &&
        data.map((word: string, i: number) => (
          <Block
            key={i}
            blockIndex={i}
            rowIndex={rowIndex}
            selected={selectBlocks}
            selectBlock={() => selectBlockIndex(i)}
            stack={stack}
            setStack={setStack}
            word={word}
            focusOnCaret={focusOnCaret}
          />
        ))}
      <Caret
        focusOnCaret={focusOnCaret}
        inputRef={caretRef}
        rowIndex={rowIndex}
        stack={stack}
        setStack={setStack}
      />
      {data.length > 0 && (
        <span
          className={`
            font-mono text-xs text-orange-600 ml-auto p-0 mr-3
            whitespace-nowrap print:hidden
          `}
        >
          {data.length} Words
        </span>
      )}

      {selectBlocks.length > 1 && (
        <FunctionBar>
          {options.map((obj, i: number) => (
            <button
              autoFocus={i == 0}
              key={i}
              className={`btn btn-selectop`}
              onClick={obj.action}
            >
              {obj.icon}
              {obj.name}
            </button>
          ))}
        </FunctionBar>
      )}
    </>
  );
};

export default Text;
