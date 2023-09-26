import { notify } from "@/components/ui/notify/Notify";
import words from "../data/words";

export const filterWord = (query: string): string[] =>
  words.filter((wrd: any) => {
    if (query === "") return wrd;
    return wrd.toLowerCase().includes(query.toLowerCase());
  });

export const copy = (text: string) => {
  notify("Copied to clipboard", "copy");
  navigator.clipboard.writeText(text);
};

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
    setTimeout(() => setState(indexesInBetween), 1);
  } else {
    setState([index]);
  }
};

export const isEndOfHighlight = (selected: number[], blockIndex: number) => {
  if (
    selected.length > 1 &&
    selected.includes(blockIndex) &&
    selected[selected.length - 1] == blockIndex
  ) {
    return true;
  } else {
    return false;
  }
};

export const sentence = (
  selectBlocks: number[],
  textData: string[]
): string => {
  let highlightedSectence: string[] = [];
  selectBlocks.forEach((i) => highlightedSectence.push(textData[i]));
  return highlightedSectence.join(" ");
};
