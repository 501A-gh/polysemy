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

export type IntentType = {
  category: "text" | "table" | "list";
  name: string;
  htmlElement: string;
  markdownSymbol: MarkdownSymbolType;
};

export const rowIntent: IntentType[] = [
  { category: "text", name: "paragraph", htmlElement: "p", markdownSymbol: "" },
  {
    category: "text",
    name: "heading 1",
    htmlElement: "h1",
    markdownSymbol: "#",
  },
  {
    category: "text",
    name: "heading 2",
    htmlElement: "h2",
    markdownSymbol: "##",
  },
  {
    category: "text",
    name: "heading 3",
    htmlElement: "h3",
    markdownSymbol: "###",
  },
  {
    category: "text",
    name: "heading 4",
    htmlElement: "h4",
    markdownSymbol: "####",
  },
  {
    category: "text",
    name: "heading 5",
    htmlElement: "h5",
    markdownSymbol: "#####",
  },
  {
    category: "text",
    name: "heading 6",
    htmlElement: "h6",
    markdownSymbol: "######",
  },
  { category: "text", name: "quote", htmlElement: "q", markdownSymbol: ">" },
  {
    category: "table",
    name: "table",
    htmlElement: "table",
    markdownSymbol: "",
  },
  {
    category: "text",
    name: "horizontal line",
    htmlElement: "hr",
    markdownSymbol: "---",
  },
  {
    category: "list",
    name: "unordered list",
    htmlElement: "ul",
    markdownSymbol: "-",
  },
  {
    category: "list",
    name: "ordered list",
    htmlElement: "ol",
    markdownSymbol: "1",
  },
];
