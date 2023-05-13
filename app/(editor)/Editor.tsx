"use client";
import Row from "@/components/row/Row";
import React, { useState } from "react";

const Editor = () => {
  const [paragraph, setParagraph] = useState<[string[]]>([
    ["Welcome", "to", "Polysemy."],
  ]);
  return (
    <section
      className={`
        flex flex-col h-auto pb-auto
        print:pt-1
      `}
    >
      {paragraph.map((p, i) => (
        <Row
          key={i}
          index={i}
          text={p}
          paragraph={paragraph}
          setParagraph={setParagraph}
        />
      ))}
    </section>
  );
};

export default Editor;
