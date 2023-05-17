import React from "react";
import { IntentIdType } from "@/util/data/rowIntentDict";
import { IntentComponentProps } from "../../Row";

export interface TableType {
  intentId: IntentIdType;
  data: string[][];
}

const Table: React.FC<IntentComponentProps> = ({
  rowIndex,
  stack,
  setStack,
}) => {
  return <></>;
};

export default Table;
