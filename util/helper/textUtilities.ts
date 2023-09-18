import { StackType } from "@/components/ui/Editor";
import { notify } from "@/components/ui/notify/Notify";

export const textBackspace = (
  deletingIndex: number,
  setStack: (stack: any) => StackType[],
  rowIndex: number
) => {
  setStack((prevItems: StackType[]) => {
    const updatedItems = [...prevItems];
    updatedItems[rowIndex].data.text = [...prevItems[rowIndex].data.text];
    updatedItems[rowIndex].data.text.splice(deletingIndex, 1);
    return updatedItems;
  });
};

export const textEdit = (
  newValue: string,
  blockIndex: number,
  setStack: (stack: any) => StackType[],
  rowIndex: number
) => {
  setStack((prevItems: StackType[]) => {
    const updatedItems = [...prevItems];
    updatedItems[rowIndex].data.text = [...prevItems[rowIndex].data.text];
    updatedItems[rowIndex].data.text[blockIndex] = newValue;
    return updatedItems;
  });
};

export const textInsert = (
  newValue: string,
  blockIndex: number,
  setStack: (stack: any) => StackType[],
  rowIndex: number
) => {
  setStack((prevItems: StackType[]) => {
    const updatedItems = [...prevItems];
    const updatedRow = [...prevItems[rowIndex].data.text];
    updatedRow.splice(blockIndex, 0, newValue);
    updatedItems[rowIndex].data.text = updatedRow;
    return updatedItems;
  });
};

export const textBackspaceMultiple = (
  selectBlocks: number[],
  setStack: (stack: any) => StackType[],
  rowIndex: number
) => {
  selectBlocks.reverse().forEach((i) => textBackspace(i, setStack, rowIndex));
  notify("Deleted multiple blocks in text layer", "backspace");
};

export const textApplyLink = (
  link: string,
  selectBlocks: number[],
  setStack: (stack: any) => StackType[],
  rowIndex: number,
  sentence: () => string
) => {
  const startIndex = selectBlocks[0];
  textBackspaceMultiple(selectBlocks, setStack, rowIndex);
  setStack((prevItems: StackType[]) => {
    const updatedItems = [...prevItems];
    const updatedRow = [...prevItems[rowIndex].data.text];
    updatedRow.splice(startIndex, 0, `[${sentence()}](${link})`);
    updatedItems[rowIndex].data.text = updatedRow;
    return updatedItems;
  });
  notify("Applied link to highlighted blocks", "action");
};
