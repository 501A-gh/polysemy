import React from "react";
import SelectMode, { SelectModeProps } from "../select/SelectMode";
import IntentSelect, { IntentSelectProps } from "../edit/intent/IntentSelect";

export interface SwitchModeProps extends SelectModeProps, IntentSelectProps {
  selectMode: boolean;
  children?: JSX.Element;
  status?: JSX.Element;
}

const SwitchMode: React.FC<SwitchModeProps> = ({
  selectMode,
  rowIndex,
  rowIntent,
  data,
  intentRef,
  stack,
  setStack,
  setSelectMode,
  children,
  status,
}) => {
  return (
    <section className={`grid w-full`}>
      <div
        className={`
          border w-full flex transition-all
          ${
            selectMode
              ? `
              border-transparent bg-transparent backdrop-blur-0
              rounded-none gap-2 text-left select-none
            `
              : `
              border-zinc-200 dark:border-zinc-800  
              backdrop-blur bg-white/80 dark:bg-zinc-900/80
              p-1 px-1.5 ${status ? `rounded-t-md` : `rounded-md`}
            `
          }
        `}
      >
        {selectMode ? (
          <SelectMode rowIndex={rowIndex} rowIntent={rowIntent} data={data} />
        ) : (
          <div className={`flex flex-wrap items-center`}>
            <IntentSelect
              intentRef={intentRef}
              rowIndex={rowIndex}
              stack={stack}
              setStack={setStack}
              setSelectMode={setSelectMode}
            />
            {children}
          </div>
        )}
      </div>
      {status}
    </section>
  );
};

export default SwitchMode;
