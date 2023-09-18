import React, { useEffect, useRef, useState } from "react";
import Caret from "@/components/ui/caret/Caret";
import { StackType } from "@/components/ui/Editor";
import { BlockModeTypes, checkBlockIntent } from "@/util/helper/blockUtilities";
import LinkInsert from "@/components/ui/function-bar/LinkInsert";
import Block from "./block/Block";
import GroupBlock from "./group-block/GroupBlock";
import LinkBlock from "./link-block/LinkBlock";
import { notify } from "@/components/ui/notify/Notify";
import NlpPastTense from "@/components/ui/function-bar/NlpPastTense";
import RadixPopover from "@/components/ui/RadixPopover";
import { useFxBar } from "@/components/ui/function-bar/FxBarProvider";
import TextFxBar from "@/components/ui/function-bar/text-layer/TextFxBar";
import {
  textApplyLink,
  textBackspace,
  textBackspaceMultiple,
  textEdit,
  textInsert,
} from "@/util/helper/textUtilities";
import { selectBlockIndex, sentence } from "@/util/helper/globalUtilities";

interface TextProps {
  rowIndex: number;
  stack: StackType[];
  setStack: (stack: any) => StackType[];
}

const Text: React.FC<TextProps> = ({ rowIndex, stack, setStack }) => {
  const currentRow: StackType = stack[rowIndex];
  const data = currentRow.data.text;

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

  const { showFxBar, closeFxBar } = useFxBar();

  useEffect(() => {
    if (selectBlocks.length > 1) {
      console.log("bruh");
      showFxBar(
        <>
          <TextFxBar
            sentence={() => sentence(selectBlocks, data)}
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
          {/* <button className={`btn btn-standard`} onClick={closeFxBar}>
  <Cross2Icon />
  Close
</button> */}
        </>
      );
    } else {
      closeFxBar();
    }
  }, [selectBlocks, showFxBar]);

  return (
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
                edit={(input: string) => textEdit(input, i, setStack, rowIndex)}
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
                edit={(input: string) => textEdit(input, i, setStack, rowIndex)}
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
                edit={(input: string) => textEdit(input, i, setStack, rowIndex)}
                blockMode={blockMode[i]}
                createBlockMode={() => createBlockModeAtIndex(i)}
                updateBlockMode={(mode: BlockModeTypes) =>
                  updateBlockModeAtIndex(i, mode)
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
      {data.length > 0 && (
        <span
          className={`
            font-mono text-xs orange-text
            ml-auto p-0 mr-3
            whitespace-nowrap print:hidden
          `}
        >
          {data.length} Words
        </span>
      )}

      {/* {selectBlocks.length > 1 && (
        <FunctionBar>
          <button
            autoFocus
            className={`btn btn-standard`}
            onClick={() => {
              copyRawText();
              focusOnCaret();
            }}
          >
            <ClipboardIcon />
            Copy Raw Text
          </button>
          <RadixPopover
            title="Modify"
            size="small"
            trigger={
              <button className={`btn btn-standard`}>
                <CursorArrowIcon />
                Modify
              </button>
            }
          >
            <div className={`grid`}>
              <LinkInsert applyLink={applyLink} />
              <button
                className={`btn btn-standard`}
                onClick={() => {
                  backspaceMultiple(selectBlocks);
                  focusOnCaret();
                }}
              >
                <TrashIcon />
                Delete
              </button>
            </div>
          </RadixPopover>
          <RadixPopover
            title="Format"
            size="small"
            trigger={
              <button className={`btn btn-standard`}>
                <RulerHorizontalIcon />
                Format
              </button>
            }
          >
            <div className={`grid`}>
              <button className={`btn btn-standard`}>
                <FontBoldIcon />
                Bold
              </button>
              <button className={`btn btn-standard`}>
                <FontItalicIcon />
                Italic
              </button>
              <button className={`btn btn-standard`}>
                <StrikethroughIcon />
                Strike Through
              </button>
              <button className={`btn btn-standard`}>
                <LetterCaseUppercaseIcon />
                Uppercase
              </button>
              <button className={`btn btn-standard`}>
                <LetterCaseLowercaseIcon />
                Lowercase
              </button>
            </div>
          </RadixPopover>
          <RadixPopover
            title="Others"
            size="small"
            trigger={
              <button className={`btn btn-standard`}>
                <DotsVerticalIcon />
              </button>
            }
          >
            <div className={`grid`}>
              <button className={`btn btn-standard`}>
                <ExternalLinkIcon />
                Search New Tab
              </button>
              <NlpPastTense sentence={sentence()} />
            </div>
          </RadixPopover>
        </FunctionBar>
      )} */}
    </>
  );
};

export default Text;
