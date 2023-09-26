import { notify } from "@/components/ui/notify/Notify";
import { BlockModeTypes } from "./blockUtilities";
import { sentence } from "./globalUtilities";

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

export const groupBackspaceMultiple = (
  selectBlocks: number[],
  state: string[],
  setState: (stack: string[]) => void
) => {
  selectBlocks.reverse().forEach((i) => groupBackspace(i, state, setState));
  notify("Deleted multiple blocks in text layer", "backspace");
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

export const groupApplyLink = (
  link: string,
  selectBlocks: number[],
  state: string[],
  setState: (stack: any) => void
) => {
  const startIndex = selectBlocks[0];
  groupBackspaceMultiple(selectBlocks, state, setState);

  const blockCopy = [...state];
  blockCopy.splice(
    startIndex,
    0,
    `[${sentence(selectBlocks, state)}](${link})`
  );
  setState(blockCopy);

  notify("Applied link to highlighted blocks", "action");
};
