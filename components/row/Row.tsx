import React, { useEffect, useRef, useState } from "react";
import { rowIntentDict } from "@/util/data/rowIntentDict";
import IntentSelect from "./intent/IntentSelect";

// Intent Types
import { markdownTable } from "markdown-table";
import { StackType } from "@/components/ui/Editor";
import Text from "./intent/text/Text";
import Table from "./intent/table/Table";
import { notify } from "../ui/notify/Notify";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import FocusTrap from "focus-trap-react";

export interface IntentComponentProps {
  rowIndex: number;
  stack: StackType[];
  setStack: any;
}

interface RowProps {
  rowIndex: number;
  stack: StackType[];
  setStack: any;
}

const Row: React.FC<RowProps> = ({ rowIndex, stack, setStack }) => {
  const [selectMode, setSelectMode] = useState<boolean>(true);
  const currentRow: StackType = stack[rowIndex];
  const rowIntent = rowIntentDict[currentRow.intentId];
  const data = currentRow.data;

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

  const intentRef = useRef<HTMLButtonElement>(null);
  const focusOnIntent = () => {
    if (intentRef.current != null) {
      intentRef.current.focus();
    }
  };

  useEffect(() => {
    const down = (e: any) => {
      if (e.key === "Enter" && e.metaKey) setSelectMode(true);
      if (e.altKey && e.shiftKey) focusOnIntent();
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const [selectRows, setSelectRows] = useState<number[]>([]);

  return (
    <div className={`flex items-stretch gap-1.5`}>
      <button
        onClick={() => setSelectMode(false)}
        className={`
          transition-all outline-none rounded-full peer group
          ${
            selectMode
              ? `focus:bg-orange-500 focus:dark:bg-orange-700 w-3 h-3 my-auto`
              : `bg-gray-300 dark:bg-gray-800 w-0.5 my-2`
          }
        `}
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
            case "h":
              break;
            case "Backspace" || "Delete":
              confirmDelete();
              break;
          }
        }}
      >
        {/* <span
          className={`hidden group-focus:block text-xs text-center capitalize`}
        >
          {stack[rowIndex].intentId}
        </span> */}
      </button>
      <div
        className={`
          border    
          peer-focus:border-y-gray-300/80
          peer-focus:dark:border-y-gray-800/80
          w-full flex transition-all 
          ${
            selectMode
              ? `
              border-transparent bg-transparent backdrop-blur-0
              rounded-none gap-2 text-left select-none
            `
              : `
              border-gray-200 dark:border-gray-900  
              backdrop-blur bg-white/80 dark:bg-gray-950/90
              p-1 px-1.5 rounded-md
            `
          }`}
      >
        {selectMode ? (
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
                  orange-focus text-gray-400 dark:text-gray-700
                `}
              >
                {rowIndex + 1}
              </div>
            </div>
            <ReactMarkdown
              className={` 
                m-0 flex items-center
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
          </>
        ) : (
          <FocusTrap>
            <div className={`flex flex-wrap items-center`}>
              <IntentSelect
                intentRef={intentRef}
                rowIndex={rowIndex}
                stack={stack}
                setStack={setStack}
                setSelectMode={setSelectMode}
              />
              {rowIntent.category == "text" && (
                <Text rowIndex={rowIndex} stack={stack} setStack={setStack} />
              )}
              {rowIntent.category == "table" && (
                <Table rowIndex={rowIndex} stack={stack} setStack={setStack} />
              )}
            </div>
          </FocusTrap>
        )}
      </div>
    </div>
  );
};

export default Row;
