import React, { useEffect, useRef, useState } from "react";
import IntentSelect from "../intent/IntentSelect";
import { StackType } from "@/app/(editor)/Editor";
import Text from "../intent/text/Text";
import Table from "../intent/table/Table";
import { rowIntentDict } from "@/util/data/rowIntentDict";

interface EditModeProps extends React.HTMLAttributes<HTMLDivElement> {
  rowIndex: number;
  stack: StackType[];
  setStack: any;
  setSelectMode: any;
}

const EditMode: React.FC<EditModeProps> = ({
  rowIndex,
  stack,
  setStack,
  setSelectMode,
  ...props
}) => {
  const [highlightPoint, setHighlightPoint] = useState([]);

  const currentRow: StackType = stack[rowIndex];
  const rowIntent = rowIntentDict[currentRow.intentId];

  const caretRef = useRef<HTMLInputElement>(null);
  const intentRef = useRef<HTMLButtonElement>(null);
  const focusOnCaret = () => {
    if (caretRef.current != null) {
      caretRef.current.focus();
    }
  };
  const focusOnIntent = () => {
    if (intentRef.current != null) {
      intentRef.current.focus();
    }
  };

  useEffect(() => {
    const down = (e: any) => {
      if (e.key === "Enter" && e.metaKey) setSelectMode(true);
      if (e.ctrlKey) focusOnCaret();
      if (e.ctrlKey && e.shiftKey) focusOnIntent();
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <div
      className={`
        top-7 sticky backdrop-blur
        flex flex-wrap items-center
        py-1
        px-2
        print:hidden
        border
        border-x-2
        
        bg-white/80
        border-y-gray-200
        
        dark:bg-gray-950/90
        dark:border-y-gray-900
        
        border-x-orange-500
        dark:border-x-orange-600
      `}
      {...props}
    >
      <IntentSelect
        intentRef={intentRef}
        focusOnCaret={focusOnCaret}
        rowIndex={rowIndex}
        stack={stack}
        setStack={setStack}
        setSelectMode={setSelectMode}
      />
      {rowIntent.category == "text" && (
        <Text
          rowIndex={rowIndex}
          stack={stack}
          setStack={setStack}
          caretRef={caretRef}
          focusOnCaret={focusOnCaret}
        />
      )}
      {rowIntent.category == "table" && (
        <Table rowIndex={rowIndex} stack={stack} setStack={setStack} />
      )}
    </div>
  );
};

export default EditMode;
