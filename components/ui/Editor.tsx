"use client";
import Row from "@/components/row/Row";
import { IntentIdType } from "@/util/data/rowIntentDict";
import React, { useState } from "react";

export interface StackType {
  intentId: IntentIdType;
  data: {
    text: string[];
    table: string[][];
  };
}

const Editor = () => {
  const [stack, setStack] = useState<StackType[]>([
    {
      intentId: "p",
      data: {
        text: ["Welcome", "to", "Polysemy."],
        table: [["Title"], ["Data"]],
      },
    },
  ]);

  return (
    <section className={`flex flex-col h-auto pb-auto print:pt-1`}>
      {stack.map((_, i) => (
        <Row key={i} rowIndex={i} stack={stack} setStack={setStack} />
      ))}
    </section>
  );
};

export default Editor;
