import { CopyIcon } from "@radix-ui/react-icons";
import words from "@/util/data/words";
import { GroupBlockDictType, groupBlockDict } from "../data/groupBlockDict";
import { notify } from "@/components/ui/notify/Notify";

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
  | "groupInsert"
  | "linkEdit";

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
