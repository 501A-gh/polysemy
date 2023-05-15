import { MarkdownSymbolType } from "../helper/getRowIntent";

interface RowIntentType {
  text: TextIntentType[];
  // block:
}

export type TextIntentType = {
  name: string;
  htmlElement: string;
  markdownSymbol: MarkdownSymbolType;
};

export const rowIntent: RowIntentType = {
  text: [
    { name: "paragraph", htmlElement: "p", markdownSymbol: "" },
    { name: "heading 1", htmlElement: "h1", markdownSymbol: "#" },
    { name: "heading 2", htmlElement: "h2", markdownSymbol: "##" },
    { name: "heading 3", htmlElement: "h3", markdownSymbol: "###" },
    { name: "heading 4", htmlElement: "h4", markdownSymbol: "####" },
    { name: "heading 5", htmlElement: "h5", markdownSymbol: "#####" },
    { name: "heading 6", htmlElement: "h6", markdownSymbol: "######" },
    { name: "quote", htmlElement: "q", markdownSymbol: ">" },
  ],
  // block: [
  //   { name: "horizontal line", hTMLElement: "hr", markdownSymbol: "---" },
  //   ol: "ordered list",
  //   ul: "unordered list",
  // ],
};
