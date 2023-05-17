import React, { useState } from "react";
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
  const currentRow: StackType = stack[rowIndex];
  const rowIntent = rowIntentDict[currentRow.intentId];
  const data = currentRow.data;

  return (
    <>
      {selectMode ? (
        <SelectMode
          rowIndex={rowIndex}
          stack={stack}
          setStack={setStack}
          setSelectMode={setSelectMode}
        >
          {rowIntent.category == "text"
            ? `${rowIntent.markdownSymbol} ${data.text && data.text.join(" ")}`
            : rowIntent.category == "table" &&
              data.table &&
              markdownTable(data.table)}
        </SelectMode>
      ) : (
        <EditMode setSelectMode={setSelectMode}>
          <IntentSelect
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
        </EditMode>
      )}
    </>
  );
};

export default Row;
