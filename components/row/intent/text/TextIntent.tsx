import React, { useEffect, useRef, useState } from "react";
import Block from "./Block";
import Caret from "@/components/Caret";

interface TextIntentProps {
  rowIndex: number;
  stack: string[][];
  setStack: any;
  setSelectMode: any;
}

const TextIntent: React.FC<TextIntentProps> = ({
  rowIndex,
  stack,
  setStack,
  setSelectMode,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [highlightPoint, setHighlightPoint] = useState([]);

  useEffect(() => {
    const down = (e: any) => {
      if (e.key === "Enter" && e.metaKey) setSelectMode(true);
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      {stack[rowIndex].length > 0 &&
        stack[rowIndex].map((word: string, i: number) => (
          <Block
            key={i}
            blockIndex={i}
            rowIndex={rowIndex}
            highlightPoint={highlightPoint}
            setHighlightPoint={setHighlightPoint}
            stack={stack}
            setStack={setStack}
            word={word}
          />
        ))}
      <Caret
        // ref={inputRef}
        rowIndex={rowIndex}
        stack={stack}
        setStack={setStack}
      />
    </>
  );
};

export default TextIntent;
