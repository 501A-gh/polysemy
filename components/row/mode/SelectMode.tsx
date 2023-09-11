import { StackType } from "@/components/ui/Editor";
import { rowIntentDict } from "@/util/data/rowIntentDict";
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
        }
      }
    } else {
      alert("Last row cannot be deleted");
    }
  };

  return (
    <button
      className={`
        flex items-center text-left
        select-none py-1 print:p-0 group
        focus:outline-none border border-dashed border-transparent 
        focus:border-gray-400/50
        focus:dark:border-gray-800 animate-slide-from-above
      `}
      autoFocus={false}
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
        className={`
          border
          border-transparent
          group-focus:border-gray-300
          dark:group-focus:border-gray-800
          ml-1 mr-2 py-0.5 px-1 w-10 text-right
          font-mono max-h-full min-h-20 rounded-sm
          print:hidden text-sm
          text-gray-400
          dark:text-gray-600
          group-focus:text-orange-500
          dark:group-focus:text-orange-500
          group-focus:bg-gray-100
          dark:group-focus:bg-gray-900
        `}
      >
        {rowIndex + 1}
      </div>
      <div
        className={`
          flex items-center
          flex-grow
        `}
      >
        <ReactMarkdown
          className={` 
            m-0
            mr-3
            p-0 w-full
            text-gray-800
            dark:text-gray-400
            print:text-black
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
    </button>
  );
};

export default SelectMode;
