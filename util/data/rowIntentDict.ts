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

export const rowIntentDict = {
  p: {
    category: "text",
    name: "paragraph",
    markdownSymbol: "",
  },
  h1: {
    category: "text",
    name: "heading 1",
    markdownSymbol: "#",
  },
  h2: {
    category: "text",
    name: "heading 2",
    markdownSymbol: "##",
  },
  h3: {
    category: "text",
    name: "heading 3",
    markdownSymbol: "###",
  },
  h4: {
    category: "text",
    name: "heading 4",
    markdownSymbol: "####",
  },
  h5: {
    category: "text",
    name: "heading 5",
    markdownSymbol: "#####",
  },
  h6: {
    category: "text",
    name: "heading 6",
    markdownSymbol: "######",
  },
  q: {
    category: "text",
    name: "quote",
    markdownSymbol: ">",
  },
  table: {
    category: "table",
    name: "table",
    markdownSymbol: "",
  },
  hr: {
    category: "text",
    name: "horizontal line",
    markdownSymbol: "---",
  },
  ul: {
    category: "list",
    name: "unordered list",
    markdownSymbol: "-",
  },
  ol: {
    category: "list",
    name: "ordered list",
    markdownSymbol: "1",
  },
};
