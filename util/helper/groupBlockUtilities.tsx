import { BlockModeTypes } from "@/components/row/intent/text/primitive-block/PrimitiveBlock";

export const groupBackspace = (
  index: number,
  state: string[],
  setState: (state: string[]) => void
) => {
  if (index >= 0 && index < state.length) {
    const blockCopy = [...state];
    blockCopy.splice(index, 1);
    setState(blockCopy);
  }
};

export const groupEdit = (
  newValue: string,
  blockIndex: number,
  state: string[],
  setState: (state: string[]) => void
) => {
  if (blockIndex >= 0 && blockIndex < state.length) {
    const blockCopy = [...state];
    blockCopy[blockIndex] = newValue;
    setState(blockCopy);
  }
};

export const groupInsert = (
  newValue: string,
  blockIndex: number,
  state: string[],
  setState: (state: string[]) => void
) => {
  if (blockIndex >= 0 && blockIndex <= state.length) {
    const blockCopy = [...state];
    blockCopy.splice(blockIndex, 0, newValue);
    setState(blockCopy);
  }
};

export const createGroupBlockModeAtIndex = (
  index: number,
  state: BlockModeTypes[],
  setState: (state: BlockModeTypes[]) => void
) => {
  const blockCopy = [...state];
  blockCopy.splice(index, 0, "standard");
  setState(blockCopy);
};

export const updateGroupBlockModeAtIndex = (
  index: number,
  newValue: BlockModeTypes,
  state: BlockModeTypes[],
  setState: (state: BlockModeTypes[]) => void
) => {
  const blockCopy = [...state];
  blockCopy[index] = newValue;
  setState(blockCopy);
};
