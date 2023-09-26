import React, { useRef, useState } from "react";
import Caret from "@/components/ui/caret/Caret";
import { StackType } from "@/components/ui/Editor";
import { BlockModeTypes, checkBlockIntent } from "@/util/helper/blockUtilities";
import Block from "./block/Block";
import GroupBlock from "./group-block/GroupBlock";
import LinkBlock from "./link-block/LinkBlock";

import {
  textApplyLink,
  textBackspace,
  textBackspaceMultiple,
  textEdit,
  textInsert,
} from "@/util/helper/textUtilities";
import {
  isEndOfHighlight,
  selectBlockIndex,
  sentence,
} from "@/util/helper/globalUtilities";
import SwitchMode, {
  SwitchModeProps,
} from "@/components/row/switch/SwitchMode";
import Widget from "@/components/row/switch/Widget";
import {
  ExclamationTriangleIcon,
  Link2Icon,
  Pencil1Icon,
} from "@radix-ui/react-icons";
import RadixDialog from "@/components/ui/RadixDialog";
import TextAction from "@/components/ui/highlight/text-layer/TextAction";

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

  const markdownLinkExtractor = require("markdown-link-extractor");
  const { links } = markdownLinkExtractor(data.join());

  const [selectBlocks, setSelectBlocks] = useState<number[]>([]);

  const caretRef = useRef<HTMLInputElement>(null);
  const focusOnCaret = () => {
    if (caretRef.current != null) {
      caretRef.current.focus();
    }
  };

  const blockModeOriginal = new Array(data.length + 1).fill("standard");
  const [blockMode, setBlockMode] =
    useState<BlockModeTypes[]>(blockModeOriginal);

  const createBlockModeAtIndex = (index: number) => {
    const updatedArray = [...blockMode];
    updatedArray.splice(index, 0, "standard");
    setBlockMode(updatedArray);
  };

  const updateBlockModeAtIndex = (index: number, newValue: BlockModeTypes) => {
    const updatedArray = [...blockMode];
    updatedArray[index] = newValue;
    setBlockMode(updatedArray);
  };

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
        <>
          {data &&
            data.length > 0 &&
            data.map((word: string, i: number) => (
              <>
                {checkBlockIntent(word) === "standard" && (
                  <Block
                    key={i}
                    blockIndex={i}
                    selected={selectBlocks}
                    selectBlock={() =>
                      selectBlockIndex(i, selectBlocks, setSelectBlocks)
                    }
                    word={word}
                    focusOnCaret={() => focusOnCaret()}
                    backspace={() => textBackspace(i, setStack, rowIndex)}
                    insert={(input: string) =>
                      textInsert(input, i, setStack, rowIndex)
                    }
                    edit={(input: string) =>
                      textEdit(input, i, setStack, rowIndex)
                    }
                    blockMode={blockMode[i]}
                    createBlockMode={() => createBlockModeAtIndex(i)}
                    updateBlockMode={(mode: BlockModeTypes) =>
                      updateBlockModeAtIndex(i, mode)
                    }
                  />
                )}
                {checkBlockIntent(word) === "group" && (
                  <GroupBlock
                    key={i}
                    blockIndex={i}
                    selected={selectBlocks}
                    selectBlock={() =>
                      selectBlockIndex(i, selectBlocks, setSelectBlocks)
                    }
                    word={word}
                    focusOnCaret={() => focusOnCaret()}
                    backspace={() => textBackspace(i, setStack, rowIndex)}
                    insert={(input: string) =>
                      textInsert(input, i, setStack, rowIndex)
                    }
                    edit={(input: string) =>
                      textEdit(input, i, setStack, rowIndex)
                    }
                    blockMode={blockMode[i]}
                    createBlockMode={() => createBlockModeAtIndex(i)}
                    updateBlockMode={(mode: BlockModeTypes) =>
                      updateBlockModeAtIndex(i, mode)
                    }
                  />
                )}
                {checkBlockIntent(word) === "link" && (
                  <LinkBlock
                    key={i}
                    blockIndex={i}
                    selected={selectBlocks}
                    selectBlock={() =>
                      selectBlockIndex(i, selectBlocks, setSelectBlocks)
                    }
                    word={word}
                    focusOnCaret={() => focusOnCaret()}
                    backspace={() => textBackspace(i, setStack, rowIndex)}
                    insert={(input: string) =>
                      textInsert(input, i, setStack, rowIndex)
                    }
                    edit={(input: string) =>
                      textEdit(input, i, setStack, rowIndex)
                    }
                    blockMode={blockMode[i]}
                    createBlockMode={() => createBlockModeAtIndex(i)}
                    updateBlockMode={(mode: BlockModeTypes) =>
                      updateBlockModeAtIndex(i, mode)
                    }
                  />
                )}
                {isEndOfHighlight(selectBlocks, i) && (
                  <TextAction
                    sentence={() => sentence(selectBlocks, data)}
                    resetSelect={() => {
                      focusOnCaret();
                      setSelectBlocks([]);
                    }}
                    backspaceMultiple={() =>
                      textBackspaceMultiple(selectBlocks, setStack, rowIndex)
                    }
                    applyLink={(link: string) =>
                      textApplyLink(
                        link,
                        selectBlocks,
                        setStack,
                        rowIndex,
                        () => sentence(selectBlocks, data)
                      )
                    }
                  />
                )}
              </>
            ))}
          <Caret
            inputRef={caretRef}
            focusOnCaret={() => focusOnCaret()}
            insert={(input: string) =>
              textInsert(input, data.length, setStack, rowIndex)
            }
            createBlockMode={() => createBlockModeAtIndex(blockMode.length)}
          />
        </>
      </SwitchMode>
      {!selectMode && selectBlocks.length < 2 && data.length > 0 && (
        <div
          className={`h-fit flex items-center justify-between gap-1 animate-slide-from-above`}
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
            ></RadixDialog>
            {links &&
              links.map((url: string) => (
                <Widget onClick={() => window.open(url, "_blank")}>
                  <Link2Icon />
                  {url}
                </Widget>
              ))}
          </div>
          <div className={`flex items-center gap-2 pr-1`}>
            <RadixDialog
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
            ></RadixDialog>
            <span className={`zinc-text text-xs `}>{data.length} Words</span>
          </div>
        </div>
      )}
    </section>
  );
};

export default Text;
