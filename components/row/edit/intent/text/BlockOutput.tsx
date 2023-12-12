import React from "react";
import { BlockType } from "./TextInterpreter";
import Block from "./block/Block";
import { selectBlockIndex } from "@/util/helper/blockUtilities";
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

interface BlockOutputProps {
  blocks: BlockType[];
  setBlocks: React.Dispatch<React.SetStateAction<BlockType[]>>;
  selectBlocks: number[];
  setSelectBlocks: React.Dispatch<React.SetStateAction<number[]>>;
  focusOnCaret: any;
}

const BlockOutput: React.FC<BlockOutputProps> = ({
  blocks,
  setBlocks,
  selectBlocks,
  setSelectBlocks,
  focusOnCaret,
}) => {
  blocks?.map((blockObj: BlockType, i: number) =>
    console.log(blockObj.content, i)
  );

  // const textApplyLink = (
  //   link: string,
  //   selectBlocks: number[],
  //   setStack: (stack: any) => StackType[],
  //   rowIndex: number,
  //   sentence: () => string
  // ) => {
  //   const startIndex = selectBlocks[0];
  //   textBackspaceMultiple(selectBlocks, setStack, rowIndex);
  //   setStack((prevItems: StackType[]) => {
  //     const updatedItems = [...prevItems];
  //     const updatedRow = [...prevItems[rowIndex].data.text];
  //     updatedRow.splice(startIndex, 0, `[${sentence()}](${link})`);
  //     updatedItems[rowIndex].data.text = updatedRow;
  //     return updatedItems;
  //   });
  //   notify("Applied link to highlighted blocks", "action");
  // };

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
              sentence={() => sentence(selectBlocks, blocks)}
              resetSelect={() => {
                focusOnCaret();
                setSelectBlocks([]);
              }}
              backspaceMultiple={() =>
                textBackspaceMultiple(selectBlocks, setStack, rowIndex)
              }
              applyLink={(link: string) =>
                textApplyLink(link, selectBlocks, setStack, rowIndex, () =>
                  sentence(selectBlocks, data)
                )
              }
            />
          )}
        </>
      ))}
    </>
  );
};

export default BlockOutput;
