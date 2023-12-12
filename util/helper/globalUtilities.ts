import { BlockType } from "@/components/row/edit/intent/text/TextInterpreter";
import { backspaceMultiple } from "./blockUtilities";
import { notify } from "@/components/ui/notify/Notify";

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

export const applyLink = (
  link: string,
  selectBlocks: number[],
  setState: React.Dispatch<React.SetStateAction<BlockType[]>>,
  sentence: string
) => {
  backspaceMultiple(selectBlocks, setState);
  setState((prevItems: BlockType[]) => {
    const updatedItems = [...prevItems];
    updatedItems.splice(selectBlocks[0], 0, {
      type: "link",
      content: `[${sentence}](${link})`,
    });
    return updatedItems;
  });
  notify("Applied link to highlighted blocks", "action");
};
