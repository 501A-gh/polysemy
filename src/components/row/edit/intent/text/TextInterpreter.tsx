export interface BlockType {
  type: "word" | "link" | "bold" | "italic" | "code" | "latex" | "group";
  content: string;
  data?: any;
}

export const splitMarkdownIntoBlocks = (markdown: string): BlockType[] => {
  const blocks: BlockType[] = [];
  const regex =
    /(\[.*?\]\(.*?\)|\*\*.*?\*\*|__.*?__|\*.*?\*|_.*?_|`.*?`|\$.*?\$|\b\w+\b|".*?"|'.*?'|\(.*?\))/g;

  let match;
  while ((match = regex.exec(markdown)) !== null) {
    const block = match[0];
    if (block.startsWith("[") && block.endsWith(")")) {
      blocks.push({ type: "link", content: block });
    } else if (block.startsWith("**") && block.endsWith("**")) {
      blocks.push({ type: "bold", content: block });
    } else if (block.startsWith("__") && block.endsWith("__")) {
      blocks.push({ type: "bold", content: block });
    } else if (block.startsWith("*") && block.endsWith("*")) {
      blocks.push({ type: "italic", content: block });
    } else if (block.startsWith("_") && block.endsWith("_")) {
      blocks.push({ type: "italic", content: block });
    } else if (block.startsWith("`") && block.endsWith("`")) {
      blocks.push({ type: "code", content: block });
    } else if (block.startsWith("$") && block.endsWith("$")) {
      blocks.push({ type: "latex", content: block });
    } else if (block.startsWith('"') && block.endsWith('"')) {
      blocks.push({ type: "group", content: block });
    } else if (block.startsWith("'") && block.endsWith("'")) {
      blocks.push({ type: "group", content: block });
    } else if (block.startsWith("(") && block.endsWith(")")) {
      blocks.push({ type: "group", content: block });
    } else {
      blocks.push({ type: "word", content: block });
    }
  }

  return blocks;
};

// const MarkdownBlockSplitter = ({ markdown }: { markdown: string }) => {
//   const blocks = splitMarkdownIntoBlocks(markdown);

//   return (
//     <div>
//       {blocks.map((block, index) => (
//         <span key={index} className={`block-type-${block.type}`}>
//           {block.content}
//         </span>
//       ))}
//     </div>
//   );
// }

// export default MarkdownBlockSplitter;
