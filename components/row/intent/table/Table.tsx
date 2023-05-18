import React, { useEffect, useState } from "react";
import { IntentIdType } from "@/util/data/rowIntentDict";
import { IntentComponentProps } from "../../Row";
import { Input } from "@/components/Input";
import { StackType } from "@/app/(editor)/Editor";
import { Button } from "@/components/Button";
import { tableColumn } from "./tableStyle";
import TableInput from "./TableInput";

export interface TableType {
  intentId: IntentIdType;
  data: string[][];
}

const Table: React.FC<IntentComponentProps> = ({
  rowIndex,
  stack,
  setStack,
}) => {
  const currentRow: StackType = stack[rowIndex];
  const data = currentRow.data.table;

  return (
    <div className={`grid ${tableColumn[data[0].length - 1]}`}>
      {data[0].map((_, i: number) => (
        <TableInput
          key={i}
          tableRowIndex={0}
          tableColumnIndex={i}
          tableData={data}
          setStack={setStack}
          placeholder="Title"
        />
      ))}

      {data.slice(1).map((dataArray: string[], tableRowIndex: number) => (
        <>
          {dataArray.map((_, tableColumnIndex: number) => (
            <TableInput
              key={tableColumnIndex}
              tableRowIndex={tableRowIndex + 1}
              tableColumnIndex={tableColumnIndex}
              tableData={data}
              setStack={setStack}
              placeholder="Data"
            />
          ))}
        </>
      ))}
    </div>
  );
};

export default Table;
