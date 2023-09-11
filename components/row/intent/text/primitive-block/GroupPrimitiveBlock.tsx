import { BlockModeTypes } from "@/util/helper/blockUtilities";
import React, { useState } from "react";

interface GroupPrimitiveBlockProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  ref: any;
  blockIndex: number;
  selected: number[];
  text: string;
  blockMode: BlockModeTypes;
}

const GroupPrimitiveBlock: React.FC<GroupPrimitiveBlockProps> = ({
  ref,
  blockIndex,
  selected,
  text,
  blockMode,
  ...props
}) => {
  const [focus, setFocus] = useState(false);

  return (
    <>
      <button
        ref={ref}
        type="button"
        className={`peer`}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        {...props}
      />
      {text.split(" ").map((w: string, i: number) => (
        <span
          {...props}
          className={`
            block 
            ${
              selected.includes(blockIndex)
                ? `
                rounded-none
                text-gray-900
                focus:text-black
                focus:shadow-green-400/40
                bg-green-300
                focus:bg-green-400
                border-green-300
                dark:bg-green-500
                dark:focus:bg-green-200
                dark:border-green-500
              `
                : `
                ${i === 0 && "rounded-l-sm"} ${
                    i === text.split(" ").length - 1 && "rounded-r-sm"
                  }
                ${
                  blockMode === "standard" && `text-gray-600 dark:text-gray-400`
                }
                ${
                  focus &&
                  `
                    peer-focus:bg-orange-200
                    peer-focus:dark:bg-orange-800 
                    peer-focus:border-b-orange-300
                    peer-focus:dark:border-b-orange-700
                    peer-focus:text-black
                    peer-focus:dark:text-white
                    duration-200
                  `
                }
              `
            }
          `}
          // ${selected.includes(blockIndex) && "highlight"}
        >
          {w}
        </span>
      ))}
    </>
  );
};

export default GroupPrimitiveBlock;
