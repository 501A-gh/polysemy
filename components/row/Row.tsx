import React, { useState } from "react";
import { IntentType, rowIntent } from "@/util/data/rowIntent";
import IntentSelect from "./intent/IntentSelect";

import SelectMode from "./mode/SelectMode";
import EditMode from "./mode/EditMode";

// Intent Types
import Text from "./intent/text/Text";
import { markdownTable } from "markdown-table";

export type RowType = string[][];

interface RowProps {
  rowIndex: number;
  stack: RowType[];
  setStack: any;
}

const Row: React.FC<RowProps> = ({ rowIndex, stack, setStack }) => {
  const [selectMode, setSelectMode] = useState<boolean>(true);
  const [intent, setIntent] = useState<IntentType>(rowIntent[0]);

  const row = stack[rowIndex];

  return (
    <>
      {selectMode ? (
        <SelectMode
          rowIndex={rowIndex}
          stack={stack}
          setStack={setStack}
          setSelectMode={setSelectMode}
        >
          {intent.category == "text" ? (
            `${intent.markdownSymbol} ` + row[0]?.join(" ")
          ) : (
            <>{intent.category == "table" && markdownTable(row)}</>
          )}
        </SelectMode>
      ) : (
        <EditMode>
          <IntentSelect
            intent={intent}
            setIntent={setIntent}
            setSelectMode={setSelectMode}
          />
          {intent.category == "text" && (
            <Text
              rowIndex={rowIndex}
              stack={stack}
              setStack={setStack}
              setSelectMode={setSelectMode}
            />
          )}
        </EditMode>
      )}
    </>
  );
};

export default Row;
