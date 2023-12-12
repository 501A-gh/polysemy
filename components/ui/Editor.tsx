"use client";
import Row from "@/components/row/Row";
import { IntentIdType } from "@/util/data/rowIntentDict";
import React, { useEffect, useState } from "react";
import NoSpaceScroll from "./NoScrollSpace";
import { notify } from "./notify/Notify";

export interface StackType {
  intentId: IntentIdType;
  data: {
    text: string,
    link: string,
    image: string,
    quote: StackType[],
    table: string[][],
    list: StackType[],
    code: string,
    math: string,
    hr: "---"
  };
}

const Editor = () => {
  const [stack, setStack] = useState<StackType[]>([
    {
      intentId: "p",
      data: {
        text: "Welcome to Polysemy.",
        link: "",
        image: "",
        quote: [],
        table: [["Title"], ["Data"]],
        list: [],
        code: "",
        math: "",
        hr: "---"
      },
    },
  ]);

  useEffect(() => {
    const down = (e: any) => {
      if (e.key === "s" && e.metaKey) notify("Saved", "action");
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <section className={`flex flex-col h-auto p-4 gap-2 print:pt-1`}>
        {stack.map((_, i) => (
          <Row key={i} rowIndex={i} stack={stack} setStack={setStack} />
        ))}
      </section>
      <NoSpaceScroll />
    </>
  );
};

export default Editor;
