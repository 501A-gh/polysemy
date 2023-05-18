import { Input, InputProps } from "@/components/Input";
import { useState } from "react";
import { TableType } from "./Table";
import { StackType } from "@/app/(editor)/Editor";

interface TableInputProps extends InputProps {
  tableRowIndex: number;
  tableColumnIndex: number;
  tableData: TableType["data"];
  setStack: any;
}

const TableInput: React.FC<TableInputProps> = ({
  tableRowIndex,
  tableColumnIndex,
  tableData,
  setStack,
  ...props
}) => {
  const content = tableData[tableRowIndex][tableColumnIndex];
  const [inputValue, setInputValue] = useState(content);

  const saveInput = (newValue: string) => {
    setStack((prevStack: StackType[]) => {
      const newStack = prevStack.map((item) => {
        const newTable = item.data.table.map(
          (childArray: string[], i: number) => {
            if (i === tableRowIndex) {
              return childArray.map((value: string, j: number) => {
                if (j === tableColumnIndex) {
                  return newValue;
                }
                return value;
              });
            }
            return childArray;
          }
        );
        return {
          ...item,
          data: {
            ...item.data,
            table: newTable,
          },
        };
      });
      return newStack;
    });
  };

  const addRow = () => {
    setStack((prevStack: StackType[]) => {
      const newStack = prevStack.map((item) => {
        if (item.data && item.data.table) {
          const newTable = [...item.data.table];
          newTable.splice(
            tableRowIndex,
            0,
            Array(item.data.table[0].length).fill("")
          );
          return {
            ...item,
            data: {
              ...item.data,
              table: newTable,
            },
          };
        }
        return item;
      });
      return newStack;
    });
  };

  const addColumn = () => {
    if (tableData[0].length < 12) {
      setStack((prevStack: StackType[]) => {
        const newStack = prevStack.map((item) => {
          if (item.data && item.data.table) {
            const newTable = item.data.table.map((childArray) => {
              const newArray = [...childArray];
              newArray.splice(tableColumnIndex, 0, "");
              return newArray;
            });
            return {
              ...item,
              data: {
                ...item.data,
                table: newTable,
              },
            };
          }
          return item;
        });
        return newStack;
      });
    } else {
      alert("You have reached the max number of columns.");
    }
  };

  return (
    <Input
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      {...props}
      onKeyDown={(e) => {
        if (e.metaKey && e.key === "k") {
          addColumn();
        }
        if (e.metaKey && e.key === "j") {
          addRow();
        }
        if (e.key === "Tab" || e.key === "Enter") {
          saveInput(inputValue);
        }
      }}
      {...props}
    />
  );
};

export default TableInput;
