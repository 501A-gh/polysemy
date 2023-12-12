import words from "@/util/data/words";
import { GroupBlockDictType, groupBlockDict } from "../data/groupBlockDict";
import { notify } from "@/components/ui/notify/Notify";
import { BlockType } from "@/components/row/edit/intent/text/TextInterpreter";

// export const primitiveBlockMode = cva("block", {
//   variants: {
//     blockMode: {
//       standard: ["block-standard"],
//       edit: ["block-edit"],
//       insert: ["block-standard"],
//       command: ["block-command"],
//       highlight: ["block-highlight"],
//       groupEdit: ["block-standard"],
//       groupInsert: ["block-standard"],
//     },
//   },
// });

export const filterWord = (query: string): string[] =>
  words.filter((wrd: any) => {
    if (query === "") return wrd;
    return wrd.toLowerCase().includes(query.toLowerCase());
  });

export const copy = (text: string) => {
  notify("Copied to clipboard", "copy");
  navigator.clipboard.writeText(text);
};

export type ActionTypes =
  | "standard"
  | "edit"
  | "insert"
  | "command"
  | "highlight"
  | "groupEdit"
  | "groupInsert"
  | "linkEdit";

export const getGroupBlockIntentData = (symbol: string) =>
  Object.values(groupBlockDict).filter(
    (obj: GroupBlockDictType) => obj.start === symbol
  )[0];

export const selectBlockIndex = (
  index: number,
  state: number[],
  setState: (state: number[]) => void
) => {
  if (state.length === 1 && index !== state[0]) {
    const start = Math.min(index, state[0]);
    const end = Math.max(index, state[0]);
    const indexesInBetween = Array.from(
      { length: end - start + 1 },
      (_, i) => start + i
    );
    setTimeout(() => setState(indexesInBetween), 1);
  } else {
    setState([index]);
  }
};

// Regular expressions to match different patterns
const bracketsRegex = /^\[.+\]$/;
const parenthesesRegex = /^\(.+\)$/;
const doubleQuotesRegex = /^".+"$/;
const singleQuotesRegex = /^'.+'$/;
const markdownLinkRegex = /^\[.+\]\(.+\)$/;

// export type BlockIntentType = "standard" | "group" | "link";
export const checkBlockIntent = (text: string): BlockType["type"] => {
  if (markdownLinkRegex.test(text)) {
    return "link";
  } else if (
    bracketsRegex.test(text) ||
    parenthesesRegex.test(text) ||
    doubleQuotesRegex.test(text) ||
    singleQuotesRegex.test(text)
  ) {
    return "group";
  } else {
    return "word";
  }
};

// export const checkGroupBlockIntent = (text: string) => {
//   if (bracketsRegex.test(text)) {
//     return;
//   }
//   if (parenthesesRegex.test(text)) {
//     return;
//   }
//   if (doubleQuotesRegex.test(text)) {
//     return;
//   }
//   if (singleQuotesRegex.test(text)) {
//     return;
//   }
// };

export const splitMarkdownLink = (
  markdownText: string
): { text: string; url: string } | null => {
  const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/;
  const match = linkPattern.exec(markdownText);
  if (match) {
    const text = match[1];
    const url = match[2];
    return { text, url };
  }
  return null;
};

export const backspace = (
  setState: React.Dispatch<React.SetStateAction<BlockType[]>>,
  index: number
) => {
  setState((prevBlock) => {
    const newBlock = [...prevBlock];
    newBlock.splice(index, 1);
    return newBlock;
  });
};

export interface updateProps {
  action: "insert" | "edit";
  blockObj: BlockType;
}

export const updateBlock = (
  setState: React.Dispatch<React.SetStateAction<BlockType[]>>,
  index: number,
  action: updateProps["action"],
  blockObj: updateProps["blockObj"]
) => {
  setState((prevBlock) => {
    const newBlock = [...prevBlock];

    if (action === "insert") {
      newBlock.splice(index, 0, blockObj);
    } else if (action === "edit") {
      newBlock[index] = blockObj;
    }

    return newBlock;
  });
};

export const backspaceMultiple = (
  selectBlocks: BlockType[],
  setState: React.Dispatch<React.SetStateAction<BlockType[]>>
) => {
  selectBlocks.reverse().forEach((i: number) => backspace(setState, i));
  notify("Deleted multiple blocks in text layer", "backspace");
};

// Exclusive to group
export const formatContent = {
  groupBlock: (
    groupBlockIntent: GroupBlockDictType | undefined,
    blocks: BlockType[]
  ) =>
    `${groupBlockIntent?.start}${blocks
      .map((blockObj: BlockType) => blockObj.content)
      .join(" ")}${groupBlockIntent?.end}`,
};
