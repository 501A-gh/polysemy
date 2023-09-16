import { BlockModeTypes } from "@/util/helper/blockUtilities";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface LinkPrimitiveBlockProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  ref: any;
  blockIndex: number;
  selected: number[];
  text: string;
  blockMode: BlockModeTypes;
}

const LinkPrimitiveBlock: React.FC<LinkPrimitiveBlockProps> = ({
  ref,
  blockIndex,
  selected,
  text,
  blockMode,
  ...props
}) => {
  const [focus, setFocus] = useState(false);
  const router = useRouter();

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
                ${blockMode === "standard" && `orange-text`}
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
        >
          {w}
        </span>
      ))}
    </>
  );
};

export default LinkPrimitiveBlock;
