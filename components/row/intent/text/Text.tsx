import React, { useRef, useState } from "react";
import Caret from "@/components/ui/caret/Caret";
import { StackType } from "@/components/ui/Editor";
import { ClipboardIcon, TrashIcon } from "@radix-ui/react-icons";
import FunctionBar from "@/components/ui/function-bar/FunctionBar";
import {
  BlockModeTypes,
  checkBlockIntent,
  selectBlockIndex,
} from "@/util/helper/blockUtilities";
import LinkInsert from "@/components/ui/function-bar/LinkInsert";
import Block from "./block/Block";
import GroupBlock from "./group-block/GroupBlock";
import LinkBlock from "./link-block/LinkBlock";

interface TextProps {
  rowIndex: number;
  stack: StackType[];
  setStack: (stack: any) => void;
}

const Text: React.FC<TextProps> = ({ rowIndex, stack, setStack }) => {
  const currentRow: StackType = stack[rowIndex];
  const data = currentRow.data.text;

  const [selectBlocks, setSelectBlocks] = useState<number[]>([]);

  // const selectGroupBlockIndex = (index: number) => {
  //   const getGroupIndex = (blockLocation: number) =>
  //     parseInt(blockLocation.toString().split(".")[1]);
  //   if (selectGroupBlocks.length === 1 && index !== selectGroupBlocks[0]) {
  //     const start = Math.min(index, getGroupIndex(selectBlocks[0]));
  //     const end = Math.max(index, getGroupIndex(selectBlocks[0]));
  //     const indexesInBetween = Array.from(
  //       { length: end - start + 1 },
  //       (_, i) => start + i
  //     );
  //     setSelectGroupBlocks(indexesInBetween);
  //   } else {
  //     setSelectGroupBlocks([index]);
  //   }
  // };

  const caretRef = useRef<HTMLInputElement>(null);
  const focusOnCaret = () => {
    if (caretRef.current != null) {
      caretRef.current.focus();
    }
  };

  const exitSelect = () => {
    setSelectBlocks([]);
  };

  const backspace = (deletingIndex: number) => {
    setStack((prevItems: StackType[]) => {
      const updatedItems = [...prevItems];
      updatedItems[rowIndex].data.text = [...prevItems[rowIndex].data.text];
      updatedItems[rowIndex].data.text.splice(deletingIndex, 1);
      return updatedItems;
    });
  };

  const edit = (newValue: string, blockIndex: number) => {
    setStack((prevItems: StackType[]) => {
      const updatedItems = [...prevItems];
      updatedItems[rowIndex].data.text = [...prevItems[rowIndex].data.text];
      updatedItems[rowIndex].data.text[blockIndex] = newValue;
      return updatedItems;
    });
  };

  const insert = (newValue: string, blockIndex: number) => {
    setStack((prevItems: StackType[]) => {
      const updatedItems = [...prevItems];
      const updatedRow = [...prevItems[rowIndex].data.text];
      updatedRow.splice(blockIndex, 0, newValue);
      updatedItems[rowIndex].data.text = updatedRow;
      return updatedItems;
    });
  };

  const sentence = () => {
    let highlightedSectence: string[] = [];
    selectBlocks.forEach((i) => highlightedSectence.push(data[i]));
    return highlightedSectence.join(" ");
  };

  const copyRawText = () => {
    navigator.clipboard.writeText(sentence());
    exitSelect();
  };

  const backspaceMultiple = (array: number[]) => {
    array.reverse().forEach((i) => backspace(i));
    exitSelect();
  };

  const convertToPastTense = (pastTenseSentence: string) => {
    pastTenseSentence.split(/\W+/).map((w: string, i: number) => {
      setStack((prevItems: StackType[]) => {
        const updatedItems = [...prevItems];
        const updatedRow = [...prevItems[rowIndex].data.text];
        updatedRow.splice(selectBlocks[i], 0, w);
        updatedItems[rowIndex].data.text = updatedRow;
        return updatedItems;
      });
    });

    const updatedSelectBlocks = selectBlocks.map((blockIndex) => {
      return blockIndex + pastTenseSentence.split(/\W+/).length;
    });

    backspaceMultiple(updatedSelectBlocks);
    focusOnCaret();
  };

  const applyLink = (link: string) => {
    const startIndex = selectBlocks[0];
    backspaceMultiple(selectBlocks);
    setStack((prevItems: StackType[]) => {
      const updatedItems = [...prevItems];
      const updatedRow = [...prevItems[rowIndex].data.text];
      updatedRow.splice(startIndex, 0, `[${sentence()}](${link})`);
      updatedItems[rowIndex].data.text = updatedRow;
      return updatedItems;
    });
  };

  const blockModeOriginal = new Array(data.length + 1).fill("standard");
  const [blockMode, setBlockMode] =
    useState<BlockModeTypes[]>(blockModeOriginal);
  console.log(blockMode, data.length);

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

  const options = [
    {
      icon: <ClipboardIcon />,
      name: "Copy raw text ",
      action: () => {
        copyRawText();
        focusOnCaret();
      },
    },
    {
      icon: <TrashIcon />,
      name: "Delete",
      action: () => {
        backspaceMultiple(selectBlocks);
        focusOnCaret();
      },
    },
  ];

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
                backspace={() => backspace(i)}
                insert={(input: string) => insert(input, i)}
                edit={(input: string) => edit(input, i)}
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
                backspace={() => backspace(i)}
                insert={(input: string) => insert(input, i)}
                edit={(input: string) => edit(input, i)}
                blockMode={blockMode[i]}
                createBlockMode={() => createBlockModeAtIndex(i)}
                updateBlockMode={(mode: BlockModeTypes) =>
                  updateBlockModeAtIndex(i, mode)
                }
              />
            )}
            {checkBlockIntent(word) === "link" && <LinkBlock key={i} />}
          </>
        ))}
      <Caret
        inputRef={caretRef}
        focusOnCaret={() => focusOnCaret()}
        insert={(input: string) => insert(input, data.length)}
        createBlockMode={() => createBlockModeAtIndex(blockMode.length)}
      />
      {data.length > 0 && (
        <span
          className={`
            font-mono text-xs text-orange-600 
            ml-auto p-0 mr-3
            whitespace-nowrap print:hidden
          `}
        >
          {data.length} Words
        </span>
      )}

      {selectBlocks.length > 1 && (
        <FunctionBar>
          <LinkInsert applyLink={applyLink} />
          <>
            {options.map((obj, i: number) => (
              <button
                autoFocus={i == 0}
                key={i}
                className={`btn btn-selectop`}
                onClick={obj.action}
              >
                {obj.icon}
                {obj.name}
              </button>
            ))}
          </>
        </FunctionBar>
      )}
    </>
  );
};

export default Text;
