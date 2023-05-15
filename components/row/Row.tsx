import React, { useRef, useState } from "react";
import Caret from "../Caret";
import Block from "./intent/text/Block";
import { TextIntentType, rowIntent } from "@/util/data/rowIntent";
import IntentSelect from "./intent/IntentSelect";

import SelectMode from "./mode/SelectMode";
import EditMode from "./mode/EditMode";
import TextIntent from "./intent/text/TextIntent";

interface RowProps {
  rowIndex: number;
  stack: any;
  setStack: any;
}

const Row: React.FC<RowProps> = ({ rowIndex, stack, setStack }) => {
  const [selectMode, setSelectMode] = useState<boolean>(true);
  const [textIntent, setTextIntent] = useState<TextIntentType>(
    rowIntent.text[0]
  );

  return (
    <>
      {selectMode ? (
        <SelectMode
          rowIndex={rowIndex}
          stack={stack}
          setStack={setStack}
          markdownSymbol={textIntent?.markdownSymbol}
          setSelectMode={setSelectMode}
        >
          {stack[rowIndex].join(" ")}
        </SelectMode>
      ) : (
        <EditMode>
          <IntentSelect
            textIntent={textIntent}
            setTextIntent={setTextIntent}
            setSelectMode={setSelectMode}
          />
          <TextIntent
            rowIndex={rowIndex}
            stack={stack}
            setStack={setStack}
            setSelectMode={setSelectMode}
          />
        </EditMode>
      )}
    </>
  );
};

export default Row;
