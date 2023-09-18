import { StackType } from "@/components/ui/Editor";
import { notify } from "@/components/ui/notify/Notify";
import { rowIntentDict } from "@/util/data/rowIntentDict";
import { DrawingPinIcon } from "@radix-ui/react-icons";
import { markdownTable } from "markdown-table";
import React from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";

interface SelectModeProps extends React.HTMLAttributes<HTMLDivElement> {
  rowIndex: number;
  stack: any;
  setStack: any;
  setSelectMode: any;
}

const SelectMode: React.FC<SelectModeProps> = ({
  rowIndex,
  stack,
  setStack,
  setSelectMode,
  ...props
}) => {
  const addStackAbove = () => {
    setStack((prevItems: StackType[]) => {
      const updatedItems = [...prevItems];
      updatedItems.splice(rowIndex, 0, {
        intentId: "p",
        data: {
          text: [],
          table: [[""], [""]],
        },
      });
      return updatedItems;
    });
  };

  const addStackBelow = () => {
    setStack((prevItems: StackType[]) => {
      const updatedItems = [...prevItems];
      updatedItems.splice(rowIndex + 1, 0, {
        intentId: "p",
        data: {
          text: [],
          table: [[""], [""]],
        },
      });
      return updatedItems;
    });
  };

  const currentRow: StackType = stack[rowIndex];
  const rowIntent = rowIntentDict[currentRow.intentId];
  const data = currentRow.data;

  const deleteStack = () => {
    setStack((oldValues: [string[]]) =>
      oldValues.filter((_: any, i: number) => i !== rowIndex)
    );
  };

  const confirmDelete = () => {
    if (stack.length != 1) {
      if (data.text.length == 0 || data.table.length == 0) {
        deleteStack();
      } else {
        if (confirm("Are you sure you want to delete this paragraph?")) {
          deleteStack();
          notify("Deleted populated row", "backspace");
        }
      }
    } else {
      notify("Last row cannot be deleted", "alert");
    }
  };

  return (
    <div
      className={`
        flex gap-4 text-left
        select-none p-1 print:p-0
      `}
    >
      <button
        className={`
          focus:outline-none border border-transparent
          py-0.5 px-1 w-full max-w-[100px] min-w-[50px] text-right
          font-mono h-fit rounded-sm  
          print:hidden text-sm
          group flex items-center justify-between
        `}
        onClick={() => setSelectMode(false)}
        onKeyDown={(e) => {
          switch (e.key) {
            case "m":
              addStackAbove();
              break;
            case "n":
              addStackBelow();
              break;
            case "c":
              break;
            case "Backspace" || "Delete":
              confirmDelete();
              break;
          }
        }}
      >
        <div
          className={`text-gray-300 dark:text-gray-800 group-focus:gray-text rounded-sm uppercase`}
        >
          {currentRow.intentId}
        </div>
        <div
          className={`text-gray-400 dark:text-gray-600 group-focus:orange-text `}
        >
          {rowIndex + 1}
        </div>
      </button>
      <div className={`col-span-11 border border-transparent pt-0.5`}>
        <ReactMarkdown
          className={` 
            m-0 mr-3 p-0 w-full
            text-gray-800 dark:text-gray-400 print:text-black
          `}
          remarkPlugins={[remarkGfm]}
        >
          {`${
            rowIntent.category == "text"
              ? `${rowIntent.markdownSymbol} ${
                  data.text && data.text.join(" ")
                }`
              : rowIntent.category == "table" &&
                data.table &&
                `${markdownTable(data.table)}`
          }`}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default SelectMode;
