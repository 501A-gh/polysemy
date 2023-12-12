import { BlockType } from "@/components/row/edit/intent/text/TextInterpreter";

export const isEndOfHighlight = (
  selected: number[],
  blockIndex: number
): boolean => {
  if (
    selected.length > 1 &&
    selected.includes(blockIndex) &&
    selected[selected.length - 1] == blockIndex
  ) {
    return true;
  } else {
    return false;
  }
};

export const sentence = (
  selectBlocks: number[],
  blocks: BlockType[]
): string => {
  let highlightedSectence: string[] = [];
  selectBlocks.forEach((i) => highlightedSectence.push(blocks[i].content));
  return highlightedSectence.join(" ");
};
