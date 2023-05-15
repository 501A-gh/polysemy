import React, { useState } from "react";
import { Input } from "../../Input";
import { TextIntentType, rowIntent } from "@/util/data/rowIntent";
import { Button } from "../../Button";

interface IntentSelectProps
  extends React.HTMLAttributes<typeof HTMLDivElement> {
  textIntent: any;
  setTextIntent: any;
  setSelectMode: any;
}

const IntentSelect = ({
  textIntent,
  setTextIntent,
  setSelectMode,
}: IntentSelectProps) => {
  const [commandMode, setCommandMode] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState();
  const [filteredRowIntent, setFilteredRowIntent] = useState([]);

  const setRowIntent = (intent: TextIntentType) => {
    setTextIntent(intent);
    setCommandMode(false);
    setSelectMode(false);
  };

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

          {rowIntent.text.map((intent: TextIntentType) => (
            <Button
              className={`uppercase`}
              onClick={() => setRowIntent(intent)}
            >
              {intent?.htmlElement}
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
          {textIntent?.name}
        </Button>
      )}
    </div>
  );
};

export default IntentSelect;
