import React, { useState } from "react";
import {
  IntentIdType,
  RowIntentDictType,
  rowIntentDict,
} from "@/util/data/rowIntentDict";
import { StackType } from "@/app/(editor)/Editor";

export type IntentCategory = "text" | "table" | "list";

interface IntentSelectProps
  extends React.HTMLAttributes<typeof HTMLDivElement> {
  intentRef: React.Ref<HTMLButtonElement>;
  focusOnCaret: any;
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

const IntentSelect: React.FC<IntentSelectProps> = ({
  intentRef,
  focusOnCaret,
  rowIndex,
  stack,
  setStack,
  setSelectMode,
}) => {
  const [commandMode, setCommandMode] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [suggestedOptions, setSuggestedOptions] = useState<RowIntentDictType[]>(
    []
  );

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

  const rowIntentDictArray: RowIntentDictType[] = Object.values(
    rowIntentDict
  ) as RowIntentDictType[];
  console.log(rowIntentDictArray);

  return (
    <>
      {commandMode ? (
        <>
          <input
            autoFocus
            placeholder={"Type MD symbol or name"}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              const inputValueLower = e.target.value.toLowerCase();
              const results = rowIntentDictArray.filter(
                (obj: RowIntentDictType) => {
                  const property1Lower = obj.markdownSymbol.toLowerCase();
                  const property2Lower = obj.name.toLowerCase();

                  return (
                    property1Lower.includes(inputValueLower) ||
                    property2Lower.includes(inputValueLower)
                  );
                }
              );

              setSuggestedOptions(results);
            }}
          />

          {suggestedOptions.map((obj: RowIntentDictType, i: number) => (
            <button
              key={i}
              className={`capitalize btn btn-standard`}
              onClick={() => {
                updateIntentId(obj.intentId);
                focusOnCaret();
              }}
            >
              {obj.name}
            </button>
          ))}
        </>
      ) : (
        <button
          ref={intentRef}
          className={`uppercase btn btn-standard`}
          onClick={() => {
            setCommandMode(true);
          }}
        >
          {stack[rowIndex].intentId}
        </button>
      )}
    </>
  );
};

export default IntentSelect;
