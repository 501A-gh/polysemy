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
import RadixDialog from "@/components/ui/RadixDialog";

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

  const convertToPastTense = (pastTenseSentence: string) => {
    pastTenseSentence.split(/\W+/).map((w: string, i: number) => {
      setStack((prevItems: StackType[]) => {
        const updatedItems = [...prevItems];
        const updatedRow = [...prevItems[rowIndex].data.text];
        updatedRow.splice(selectBlocks[i], 0, w);
        updatedItems[rowIndex].data.text = updatedRow;
        return updatedItems;
      });
    });

    const updatedSelectBlocks = selectBlocks.map((blockIndex) => {
      return blockIndex + pastTenseSentence.split(/\W+/).length;
    });

    backspaceMultiple(updatedSelectBlocks);
    focusOnCaret();
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

  const [convertedText, setConvertedText] = useState<string>("");

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
          {nlp(sentence()).has("#Verb") && (
            <RadixDialog
              title={"Past Tense"}
              trigger={
                <button
                  className={`btn btn-selectop`}
                  onClick={() => {
                    const doc = nlp(sentence());
                    doc.verbs().toPastTense();
                    setConvertedText(doc.text());
                  }}
                >
                  <CounterClockwiseClockIcon />
                  Past Tense
                </button>
              }
              description={`convert the following text to past tense.`}
              save={
                <button
                  className={`btn btn-standard`}
                  onClick={() => convertToPastTense(convertedText)}
                >
                  Establish Changes
                </button>
              }
            >
              <section className={`grid grid-cols-2 gap-1`}>
                <h6 className={`mb-0 ml-1 font-serif italic`}>Original</h6>
                <h6 className={`mb-0 ml-1 font-serif italic`}>Modified</h6>
                <div
                  className={`
                    text-gray-400
                    dark:text-gray-500
                    border border-dashed 
                    border-gray-300 
                    dark:border-gray-700 
                    text-xs p-1 rounded-sm 
                    m-0.5 py-1 px-2 font-mono
                  `}
                >
                  {sentence()}
                </div>
                <textarea
                  placeholder="Converted text"
                  value={convertedText}
                  onChange={(e) => setConvertedText(e.target.value)}
                  rows={5}
                />
              </section>
            </RadixDialog>
          )}
        </FunctionBar>
      )}
    </>
  );
};

export default Text;
