import React, { useState } from "react";
import { Button } from "../../Button";
import { IntentIdType } from "@/util/data/rowIntentDict";
import { StackType } from "@/app/(editor)/Editor";

export type IntentCategory = "text" | "table" | "list";

interface IntentSelectProps
  extends React.HTMLAttributes<typeof HTMLDivElement> {
  rowIndex: number;
  stack: StackType[];
  setStack: any;
  setSelectMode: any;
}

const options: IntentIdType[] = [
  "p",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "q",
  "table",
  "hr",
  "ul",
  "ol",
];

const IntentSelect = ({
  rowIndex,
  stack,
  setStack,
  setSelectMode,
}: IntentSelectProps) => {
  const [commandMode, setCommandMode] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState();
  const [filteredRowIntent, setFilteredRowIntent] = useState([]);

  const updateIntentId = (intentId: IntentIdType) => {
    setStack((prevStack: any) => {
      const updatedStack = [...prevStack];
      if (rowIndex >= 0 && rowIndex < updatedStack.length) {
        updatedStack[rowIndex] = {
          ...updatedStack[rowIndex],
          intentId: intentId,
        };
      }
      return updatedStack;
    });
    setCommandMode(false);
    setSelectMode(false);
  };

  // const setRowIntent = (intent: IntentIdType) => {
  //   setStack(intent);
  //   setCommandMode(false);
  //   setSelectMode(false);
  // };

  return (
    <div className={`mr-2 flex gap-0.25 items-center`}>
      {commandMode ? (
        <>
          {/* <Input
            placeholder={"type md symbol or name"}
            value={inputValue}
            onChange={(e) => {
              rowIntent.text.map((obj: TextIntentType) => {
                if (e.target.value === obj.markdownSymbol) return wrd;
                return wrd.toLowerCase().includes(e.target.value.toLowerCase());
              });
            }}
          /> */}

          {options.map((intent: IntentIdType, i: number) => (
            <Button
              key={i}
              className={`uppercase`}
              onClick={() => updateIntentId(intent)}
            >
              {intent}
            </Button>
          ))}
        </>
      ) : (
        <Button
          className={`capitalize`}
          onClick={() => {
            setCommandMode(true);
          }}
        >
          {stack[rowIndex].intentId}
        </Button>
      )}
    </div>
  );
};

export default IntentSelect;
