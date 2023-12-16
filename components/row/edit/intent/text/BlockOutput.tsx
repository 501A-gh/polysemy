import React from "react";
import { BlockType } from "./TextInterpreter";
import Block from "./block/Block";
import { selectBlockIndex } from "@/util/helper/globalUtilities";
import GroupBlock from "./group-block/GroupBlock";
import LinkBlock from "./link-block/LinkBlock";
import { isEndOfHighlight, sentence } from "@/util/helper/globalUtilities";
import TextAction from "@/components/ui/highlight/text-layer/TextAction";

export interface GeneralBlockProps {
  blockIndex: number;
  setBlocks: React.Dispatch<React.SetStateAction<BlockType[]>>;
  selected: number[];
  selectBlock: () => void;
  word: string;
  focusOnCaret: () => void;
}

const BlockOutput: React.FC<{
  blocks: BlockType[];
  setBlocks: React.Dispatch<React.SetStateAction<BlockType[]>>;
  selectBlocks: number[];
  setSelectBlocks: React.Dispatch<React.SetStateAction<number[]>>;
  focusOnCaret: any;
}> = ({ blocks, setBlocks, selectBlocks, setSelectBlocks, focusOnCaret }) => {
  return (
    <>
      {blocks?.map((blockObj: BlockType, i: number) => (
        <>
          {blockObj.type === "word" && (
            <Block
              key={i}
              blockIndex={i}
              setBlocks={setBlocks}
              selected={selectBlocks}
              selectBlock={() =>
                selectBlockIndex(i, selectBlocks, setSelectBlocks)
              }
              word={blockObj.content}
              focusOnCaret={focusOnCaret}
            />
          )}
          {blockObj.type === "group" && (
            <GroupBlock
              key={i}
              blockIndex={i}
              setBlocks={setBlocks}
              selected={selectBlocks}
              selectBlock={() =>
                selectBlockIndex(i, selectBlocks, setSelectBlocks)
              }
              word={blockObj.content}
              focusOnCaret={() => focusOnCaret()}
            />
          )}
          {blockObj.type === "link" && (
            <LinkBlock
              key={i}
              blockIndex={i}
              setBlocks={setBlocks}
              selected={selectBlocks}
              selectBlock={() =>
                selectBlockIndex(i, selectBlocks, setSelectBlocks)
              }
              word={blockObj.content}
              focusOnCaret={() => focusOnCaret()}
            />
          )}

          {/* Highlight Functionality */}
          {isEndOfHighlight(selectBlocks, i) && (
            <TextAction
              setBlocks={setBlocks}
              selectBlocks={selectBlocks}
              sentence={() => sentence(selectBlocks, blocks)}
              resetSelect={() => {
                focusOnCaret();
                setSelectBlocks([]);
              }}
            />
          )}
        </>
      ))}
    </>
  );
};

export default BlockOutput;
