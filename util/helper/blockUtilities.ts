import words from "@/util/data/words";
import { GroupBlockDictType, groupBlockDict } from "../data/groupBlockDict";

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

export type BlockModeTypes =
  | "standard"
  | "edit"
  | "insert"
  | "command"
  | "highlight"
  | "groupEdit"
  | "groupInsert";

export const filterWord = (query: string): string[] =>
  words.filter((wrd: any) => {
    if (query === "") return wrd;
    return wrd.toLowerCase().includes(query.toLowerCase());
  });

// Block CRUD Operations
export const copy = (text: string) => navigator.clipboard.writeText(text);

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
    setState(indexesInBetween);
  } else {
    setState([index]);
  }
};

export const getGroupBlockIntentData = (symbol: string) =>
  Object.values(groupBlockDict).filter(
    (obj: GroupBlockDictType) => obj.start === symbol
  )[0];

// Regular expressions to match different patterns
const bracketsRegex = /^\[.+\]$/;
const parenthesesRegex = /^\(.+\)$/;
const doubleQuotesRegex = /^".+"$/;
const singleQuotesRegex = /^'.+'$/;
const markdownLinkRegex = /^\[.+\]\(.+\)$/;

export type BlockIntentType = "standard" | "group" | "link";
export const checkBlockIntent = (text: string): BlockIntentType => {
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
    return "standard";
  }
};

export const checkGroupBlockIntent = (text: string) => {
  if (bracketsRegex.test(text)) {
    return;
  }
  if (parenthesesRegex.test(text)) {
    return;
  }
  if (doubleQuotesRegex.test(text)) {
    return;
  }
  if (singleQuotesRegex.test(text)) {
    return;
  }
};
