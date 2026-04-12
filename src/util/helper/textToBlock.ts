export const textToBlocks = (sentence: string): string[] => {
  const blocks = [];
  let currentBlock = "";

  const regex = /(\[[^\]]+\]\([^\)]+\))|(["'][^"']*["'])|(\([^)]+\))|\s+/g;
  const matches = sentence.match(regex);

  if (!matches) return [sentence];
  matches.forEach((match) => {
    if (match.trim() === "") {
      return;
    }
    currentBlock += match;
    if (match.endsWith(")") || match.endsWith('"') || match.endsWith("'")) {
      blocks.push(currentBlock.trim());
      currentBlock = "";
    }
  });
  if (currentBlock) blocks.push(currentBlock.trim());
  return blocks;
};
