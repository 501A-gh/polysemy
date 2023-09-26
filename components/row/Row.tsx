import React, { useEffect, useRef, useState } from "react";
import { RowIntentDictType, rowIntentDict } from "@/util/data/rowIntentDict";

// Intent Types
import { StackType } from "@/components/ui/Editor";
import Text from "./edit/intent/text/Text";
import { notify } from "../ui/notify/Notify";

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
  const rowIntent: RowIntentDictType | undefined = rowIntentDict.find(
    (obj: RowIntentDictType) => obj.intentId === currentRow.intentId
  );

  const data: StackType["data"] = currentRow.data;

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
      if (e.key === "Enter" && e.metaKey) {
        setSelectMode(true);
      }
      if (e.altKey && e.shiftKey) focusOnIntent();
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <section
      className={`flex items-stretch ${selectMode ? "gap-3" : "gap-1.5"}`}
    >
      <button
        onClick={() =>
          selectMode ? setSelectMode(false) : setSelectMode(true)
        }
        title={selectMode ? `Enter edit mode` : `Exit edit mode`}
        className={`
          transition-all outline-none rounded-full peer 
          ${
            selectMode
              ? `focus:bg-zinc-900 focus:dark:bg-zinc-100 w-3 h-3 my-auto`
              : `bg-zinc-300 dark:bg-zinc-800 w-0.5 my-1 hocus:w-1.5 hocus:my-2.5`
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
      />

      <section
        className={`
          grid gap-1 w-full rounded-sm
          ${
            selectMode &&
            `
              peer-focus:bg-zinc-200
              peer-focus:dark:bg-zinc-900
            `
          }
        `}
      >
        {rowIntent?.category == "text" && (
          <Text
            selectMode={selectMode}
            rowIndex={rowIndex}
            rowIntent={rowIntent}
            data={data}
            intentRef={intentRef}
            stack={stack}
            setStack={setStack}
            setSelectMode={setSelectMode}
          />
        )}

        {/* {rowIntent?.category == "table" && (
            <Table rowIndex={rowIndex} stack={stack} setStack={setStack} />
          )} */}
      </section>
    </section>
  );
};

export default Row;
