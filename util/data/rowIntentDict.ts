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

export type CategoryType = "text" | "table" | "list";

export interface RowIntentDictType {
  category: CategoryType;
  intentId: IntentIdType;
  markdownSymbol: MarkdownSymbolType;
  name: string;
}

export const rowIntentDict: RowIntentDictType[] = [
  {
    category: "text",
    name: "paragraph",
    markdownSymbol: "",
    intentId: "p",
  },
  {
    category: "text",
    name: "heading 1",
    markdownSymbol: "#",
    intentId: "h1",
  },
  {
    category: "text",
    name: "heading 2",
    markdownSymbol: "##",
    intentId: "h2",
  },
  {
    category: "text",
    name: "heading 3",
    markdownSymbol: "###",
    intentId: "h3",
  },
  {
    category: "text",
    name: "heading 4",
    markdownSymbol: "####",
    intentId: "h4",
  },
  {
    category: "text",
    name: "heading 5",
    markdownSymbol: "#####",
    intentId: "h5",
  },
  {
    category: "text",
    name: "heading 6",
    markdownSymbol: "######",
    intentId: "h6",
  },
  {
    category: "text",
    name: "quote",
    markdownSymbol: ">",
    intentId: "q",
  },
  {
    category: "table",
    name: "table",
    markdownSymbol: "",
    intentId: "table",
  },
  {
    category: "text",
    name: "horizontal line",
    markdownSymbol: "---",
    intentId: "hr",
  },
  {
    category: "list",
    name: "unordered list",
    markdownSymbol: "-",
    intentId: "ul",
  },
  {
    category: "list",
    name: "ordered list",
    markdownSymbol: "1",
    intentId: "ol",
  },
];
