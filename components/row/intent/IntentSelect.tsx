import React, { useState } from "react";
import { Button } from "../../Button";
import { IntentType, rowIntent } from "@/util/data/rowIntent";

interface IntentSelectProps
  extends React.HTMLAttributes<typeof HTMLDivElement> {
  intent: any;
  setIntent: any;
  setSelectMode: any;
}

const IntentSelect = ({
  intent,
  setIntent,
  setSelectMode,
}: IntentSelectProps) => {
  const [commandMode, setCommandMode] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState();
  const [filteredRowIntent, setFilteredRowIntent] = useState([]);

  const setRowIntent = (intent: IntentType) => {
    setIntent(intent);
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

          {rowIntent.map((intent: IntentType, i: number) => (
            <Button
              key={i}
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
          {intent.name}
        </Button>
      )}
    </div>
  );
};

export default IntentSelect;
