import React from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

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
    setStack((prevItems: any) => {
      const updatedItems = [...prevItems];
      updatedItems.splice(rowIndex, 0, [[]]);
      return updatedItems;
    });
  };

  const newParagraph = () => {
    setStack([...stack, []]);
  };

  const deleteParagraph = () => {
    if (confirm("Are you sure you want to delete this paragraph?")) {
      setStack((oldValues: [string[]]) =>
        oldValues.filter((_: any, i: number) => i !== rowIndex)
      );
    }
  };

  return (
    <div
      className={`
        flex items-center
        select-none
        py-1 print:p-0
      `}
    >
      <button
        autoFocus
        onClick={() => setSelectMode(false)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.metaKey) {
            // newParagraph();
            addStackAbove();
          }
          switch (e.key) {
            case "o":
              alert("bruh");
              break;
            case "Backspace" || "Delete":
              deleteParagraph();
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
          from-orange-400 dark:from-orange-500
          to-red-400 dark:to-red-500
          focus:text-white
          dark:focus:text-black
        `}
      >
        {rowIndex}
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
        >
          {`${props.children}`}
        </ReactMarkdown>
      </div>
      {stack[rowIndex][0]?.length > 0 && (
        <span
          className={`
            font-mono text-xs text-orange-600 ml-auto mr-3
            whitespace-nowrap print:hidden
          `}
        >
          {stack[rowIndex][0].length}
        </span>
      )}
    </div>
  );
};

export default SelectMode;
