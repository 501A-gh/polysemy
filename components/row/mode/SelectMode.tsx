import { StackType } from "@/app/(editor)/Editor";
import React from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";

interface SelectModeProps extends React.HTMLAttributes<HTMLDivElement> {
  rowIndex: number;
  stack: any;
  setStack: any;
  setSelectMode: any;
}

const SelectMode = ({
  rowIndex,
  stack,
  setStack,
  setSelectMode,
  ...props
}: SelectModeProps) => {
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
    <div className={`flex items-center select-none py-1 print:p-0`}>
      <button
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
        className={`
          ml-1
          mr-2
          py-0.5
          px-2
          focus:outline-none
          font-mono max-h-full min-h-20 rounded-sm
          print:hidden text-sm
          text-gray-400
          dark:text-gray-600
          focus:bg-gradient-to-b 
          from-orange-500 dark:from-orange-500
          to-red-400 dark:to-red-500
          focus:text-white
          dark:focus:text-black
        `}
      >
        {rowIndex + 1}
      </button>
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
          {`${props.children}`}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default SelectMode;
