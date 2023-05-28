import React, { useRef, useState } from "react";
import { rowIntentDict } from "@/util/data/rowIntentDict";
import IntentSelect from "./intent/IntentSelect";

import SelectMode from "./mode/SelectMode";
import EditMode from "./mode/EditMode";

// Intent Types
import { markdownTable } from "markdown-table";
import { StackType } from "@/app/(editor)/Editor";
import Text from "./intent/text/Text";
import Table from "./intent/table/Table";

export interface IntentComponentProps {
  rowIndex: number;
  stack: StackType[];
  setStack: any;
}

interface RowProps {
  rowIndex: number;
  stack: StackType[];
  setStack: any;
}

const Row: React.FC<RowProps> = ({ rowIndex, stack, setStack }) => {
  const [selectMode, setSelectMode] = useState<boolean>(true);

  return (
    <>
      {selectMode ? (
        <SelectMode
          rowIndex={rowIndex}
          stack={stack}
          setStack={setStack}
          setSelectMode={setSelectMode}
        ></SelectMode>
      ) : (
        <EditMode
          rowIndex={rowIndex}
          stack={stack}
          setStack={setStack}
          setSelectMode={setSelectMode}
        />
      )}
    </>
  );
};

export default Row;
