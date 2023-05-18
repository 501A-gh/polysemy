import React, { useState } from "react";
import { Button } from "../../Button";
import {
  IntentIdType,
  RowIntentDictType,
  rowIntentDict,
} from "@/util/data/rowIntentDict";
import { StackType } from "@/app/(editor)/Editor";
import { Input } from "@/components/Input";

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
          <Input
            placeholder={"Type MD symbol or name"}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              const results = rowIntentDictArray.filter(
                (obj: RowIntentDictType) => {
                  const inputValueLower = inputValue.toLowerCase();
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
            <Button
              key={i}
              className={`capitalize`}
              onClick={() => updateIntentId(obj.intentId)}
            >
              {obj.name}
            </Button>
          ))}
        </>
      ) : (
        <Button
          className={`uppercase`}
          onClick={() => {
            setCommandMode(true);
          }}
        >
          {stack[rowIndex].intentId}
        </Button>
      )}
    </>
  );
};

export default IntentSelect;
