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
          key={i}
          className={`
            block
            ${
              selected.includes(blockIndex)
                ? `block-mode-highlight`
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
                    peer-focus:bg-gray-200
                    peer-focus:dark:bg-gray-800
                    peer-focus:border-b-gray-300
                    peer-focus:dark:border-b-gray-700
                    peer-focus:text-black
                    peer-focus:dark:text-white
                    peer-focus:animate-pulse
                    duration-200
                  `
                }
              `
            }
          `}
        >
          {w}
        </span>
      ))}
    </>
  );
};

export default GroupPrimitiveBlock;
