import { remark } from "remark";
import remarkGfm from "remark-gfm";
import type { BlockType } from "@/components/row/edit/intent/text/TextInterpreter";

const markdownProcessor = remark().use(remarkGfm);

export const blocksToMarkdown = (blocks: BlockType[]): string =>
  blocks.map((block) => block.content).join(" ").trim();

export const normalizeMarkdown = (markdown: string): string => {
  const trimmed = markdown.trim();

  if (!trimmed) {
    return "";
  }

  try {
    return String(markdownProcessor.processSync(trimmed)).trimEnd();
  } catch {
    return trimmed;
  }
};

export const blocksToNormalizedMarkdown = (blocks: BlockType[]): string =>
  normalizeMarkdown(blocksToMarkdown(blocks));
