import React, { useEffect, useRef, useState } from "react";
import IntentSelect from "../intent/IntentSelect";
import { StackType } from "@/components/ui/Editor";
import Text from "../intent/text/Text";
import Table from "../intent/table/Table";
import { rowIntentDict } from "@/util/data/rowIntentDict";
import { FxBarProvider } from "@/components/ui/function-bar/FxBar";

interface EditModeProps extends React.HTMLAttributes<HTMLDivElement> {
  rowIndex: number;
  stack: StackType[];
  setStack: (stack: StackType) => StackType[];
  setSelectMode: any;
}

const EditMode: React.FC<EditModeProps> = ({
  rowIndex,
  stack,
  setStack,
  setSelectMode,
  ...props
}) => {
  const currentRow: StackType = stack[rowIndex];
  const rowIntent = rowIntentDict[currentRow.intentId];

  const intentRef = useRef<HTMLButtonElement>(null);
  const focusOnIntent = () => {
    if (intentRef.current != null) {
      intentRef.current.focus();
    }
  };

  useEffect(() => {
    const down = (e: any) => {
      if (e.key === "Enter" && e.metaKey) setSelectMode(true);
      if (e.altKey && e.shiftKey) focusOnIntent();
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <FxBarProvider>
      <div
        className={`
          backdrop-blur
          flex flex-wrap items-center
          py-1 px-2
          print:hidden
          border border-x-2        
          bg-white/80
          border-y-gray-200
          
          dark:bg-gray-950/90
          dark:border-y-gray-900
          
          border-x-orange-500
          dark:border-x-orange-900
        `}
        {...props}
      >
        <IntentSelect
          intentRef={intentRef}
          rowIndex={rowIndex}
          stack={stack}
          setStack={setStack}
          setSelectMode={setSelectMode}
        />
        {rowIntent.category == "text" && (
          <Text rowIndex={rowIndex} stack={stack} setStack={setStack} />
        )}
        {rowIntent.category == "table" && (
          <Table rowIndex={rowIndex} stack={stack} setStack={setStack} />
        )}
      </div>
    </FxBarProvider>
  );
};

export default EditMode;
