import { StackType } from "@/components/ui/Editor";
import { RowIntentDictType } from "@/util/data/rowIntentDict";
import { markdownTable } from "markdown-table";
import React from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";

export interface SelectModeProps {
  rowIndex: number;
  rowIntent: RowIntentDictType | undefined;
  data: StackType["data"];
}

const SelectMode: React.FC<SelectModeProps> = ({
  rowIndex,
  rowIntent,
  data,
}) => {
  return (
    <>
      <div
        className={`
          group flex items-stretch justify-between
          w-full max-w-[40px] min-w-[40px]
        `}
      >
        <div
          className={`
          focus:outline-none w-full
          border border-transparent
          py-0.5 px-1 flex items-center justify-end
          font-mono rounded
          print:hidden text-sm
          orange-focus text-zinc-400 dark:text-zinc-700
        `}
        >
          {rowIndex + 1}
        </div>
      </div>
      <ReactMarkdown
        className={`
          m-0 flex items-center
          text-zinc-800 dark:text-zinc-400 print:text-black
        `}
        remarkPlugins={[remarkGfm]}
      >
        {`${rowIntent?.category == "text"
            ? `${rowIntent?.markdownSymbol} ${data?.text}`
            : rowIntent?.category == "table" &&
            data.table &&
            `${markdownTable(data.table)}`
          }`}
      </ReactMarkdown>
    </>
  );
};

export default SelectMode;
