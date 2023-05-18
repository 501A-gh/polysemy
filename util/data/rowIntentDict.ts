export type MarkdownSymbolType =
  | ""
  | "#"
  | "##"
  | "###"
  | "####"
  | "#####"
  | "######"
  | ">"
  | "-"
  | "1"
  | "---";

export type IntentIdType =
  | "p"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "q"
  | "table"
  | "hr"
  | "ul"
  | "ol";

export interface RowIntentDictType {
  category: "text" | "table" | "list";
  intentId: IntentIdType;
  markdownSymbol: MarkdownSymbolType;
  name: string;
}

export const rowIntentDict = {
  p: {
    category: "text",
    name: "paragraph",
    markdownSymbol: "",
    intentId: "p",
  },
  h1: {
    category: "text",
    name: "heading 1",
    markdownSymbol: "#",
    intentId: "h1",
  },
  h2: {
    category: "text",
    name: "heading 2",
    markdownSymbol: "##",
    intentId: "h2",
  },
  h3: {
    category: "text",
    name: "heading 3",
    markdownSymbol: "###",
    intentId: "h3",
  },
  h4: {
    category: "text",
    name: "heading 4",
    markdownSymbol: "####",
    intentId: "h4",
  },
  h5: {
    category: "text",
    name: "heading 5",
    markdownSymbol: "#####",
    intentId: "h5",
  },
  h6: {
    category: "text",
    name: "heading 6",
    markdownSymbol: "######",
    intentId: "h6",
  },
  q: {
    category: "text",
    name: "quote",
    markdownSymbol: ">",
    intentId: "q",
  },
  table: {
    category: "table",
    name: "table",
    markdownSymbol: "",
    intentId: "table",
  },
  hr: {
    category: "text",
    name: "horizontal line",
    markdownSymbol: "---",
    intentId: "hr",
  },
  ul: {
    category: "list",
    name: "unordered list",
    markdownSymbol: "-",
    intentId: "ul",
  },
  ol: {
    category: "list",
    name: "ordered list",
    markdownSymbol: "1",
    intentId: "ol",
  },
};
