"use client";
import Row from "@/components/row/Row";
import React, { useState } from "react";

const Editor = () => {
  const [stack, setStack] = useState<[string[]]>([
    ["Welcome", "to", "Polysemy."],
  ]);
  return (
    <section
      className={`
        flex flex-col h-auto pb-auto
        print:pt-1
      `}
    >
      {stack.map((p, i) => (
        <Row key={i} rowIndex={i} stack={stack} setStack={setStack} />
      ))}
    </section>
  );
};

export default Editor;
