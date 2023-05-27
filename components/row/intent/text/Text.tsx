import React, { useState } from "react";
import Block from "./Block";
import Caret from "@/components/Caret";
import { StackType } from "@/app/(editor)/Editor";

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
  const [highlightPoint, setHighlightPoint] = useState([]);

  const currentRow: StackType = stack[rowIndex];
  const data = currentRow.data.text;

  return (
    <>
      {data &&
        data.length > 0 &&
        data.map((word: string, i: number) => (
          <Block
            key={i}
            blockIndex={i}
            rowIndex={rowIndex}
            highlightPoint={highlightPoint}
            setHighlightPoint={setHighlightPoint}
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
            font-mono text-xs text-orange-600 ml-auto mr-3
            whitespace-nowrap print:hidden
          `}
        >
          {data.length} Words
        </span>
      )}
    </>
  );
};

export default Text;
