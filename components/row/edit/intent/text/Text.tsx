import React, { useRef, useState } from "react";
import Caret from "@/components/ui/caret/Caret";
import { StackType } from "@/components/ui/Editor";

import SwitchMode, {
  SwitchModeProps,
} from "@/components/row/switch/SwitchMode";
import Widget from "@/components/row/switch/Widget";
import { Pencil1Icon } from "@radix-ui/react-icons";
import RadixDialog from "@/components/ui/RadixDialog";
import { BlockType, splitMarkdownIntoBlocks } from "./TextInterpreter";
import BlockOutput from "./BlockOutput";
import { updateBlock } from "@/util/helper/globalUtilities";

interface TextProps extends SwitchModeProps {
  rowIndex: number;
  stack: StackType[];
  setStack: (stack: any) => StackType[];
}

const Text: React.FC<TextProps> = ({
  rowIndex,
  stack,
  setStack,
  intentRef,
  rowIntent,
  selectMode,
  setSelectMode,
}) => {
  const currentRow: StackType = stack[rowIndex];
  const data = currentRow.data.text;

  const [blocks, setBlocks] = useState<BlockType[]>(
    splitMarkdownIntoBlocks(data)
  );
  const [selectBlocks, setSelectBlocks] = useState<number[]>([]);

  // const markdownLinkExtractor = require("markdown-link-extractor");
  // const { links } = markdownLinkExtractor(data);

  const caretRef = useRef<HTMLInputElement>(null);
  const focusOnCaret = () => {
    if (caretRef.current != null) {
      caretRef.current.focus();
    }
  };

  // const [blockMode, setBlockMode] = useState<BlockModeTypes[]>(blockModeOriginal);

  // const createBlockModeAtIndex = (index: number) => {
  //   const updatedArray = [...blockMode];
  //   updatedArray.splice(index, 0, "standard");
  //   setBlockMode(updatedArray);
  // };

  // const updateBlockModeAtIndex = (index: number, newValue: BlockModeTypes) => {
  //   const updatedArray = [...blockMode];
  //   updatedArray[index] = newValue;
  //   setBlockMode(updatedArray);
  // };

  return (
    <section className={`grid gap-1 w-full`}>
      <SwitchMode
        rowIndex={rowIndex}
        rowIntent={rowIntent}
        data={currentRow.data}
        intentRef={intentRef}
        stack={stack}
        setStack={setStack}
        selectMode={selectMode}
        setSelectMode={setSelectMode}
      >
        <BlockOutput
          blocks={blocks}
          setBlocks={setBlocks}
          selectBlocks={selectBlocks}
          setSelectBlocks={setSelectBlocks}
          focusOnCaret={focusOnCaret}
        />
        <Caret
          inputRef={caretRef}
          focusOnCaret={() => focusOnCaret()}
          insert={(inputBlockObj: BlockType) =>
            updateBlock(setBlocks, blocks.length, "insert", inputBlockObj)
          }
        />
      </SwitchMode>
      {!selectMode && selectBlocks.length < 2 && data.length > 0 && (
        <div
          className={`
            flex items-center justify-between gap-1 
            h-fit animate-slide-from-above 
          `}
        >
          <div className={`flex items-center gap-1`}>
            <RadixDialog
              title="Find & Replace"
              trigger={
                <Widget>
                  <Pencil1Icon />
                  Find & Replace
                </Widget>
              }
              save={
                <button className={`btn btn-standard`}>
                  Establish Changes
                </button>
              }
              description={`Resolve ${data.length} misspelled words`}
            >
              <p>Editor</p>
            </RadixDialog>

            {/* {links &&
              links.map((url: string, i: number) => (
                <Widget key={i} onClick={() => window.open(url, "_blank")}>
                  <Link2Icon />
                  {url}
                </Widget>
              ))} */}
          </div>
          <div className={`flex items-center gap-2 pr-1`}>
            {/* <RadixDialog
              title="Misspell Handler"
              trigger={
                <button className={`btn btn-transparent red-text`}>
                  <ExclamationTriangleIcon />
                  {data.length} Misspelled
                </button>
              }
              save={
                <button className={`btn btn-standard`}>
                  Establish Changes
                </button>
              }
              description={`Resolve ${data.length} misspelled words`}
            ></RadixDialog> */}
            <span className={`zinc-text text-xs `}>{blocks.length} Words</span>
          </div>
        </div>
      )}
    </section>
  );
};

export default Text;
