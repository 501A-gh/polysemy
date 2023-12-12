import { ActionTypes } from "@/util/helper/blockUtilities";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface LinkPrimitiveBlockProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  ref: any;
  blockIndex: number;
  selected: number[];
  text: string;
  action: ActionTypes;
}

const LinkPrimitiveBlock: React.FC<LinkPrimitiveBlockProps> = ({
  ref,
  blockIndex,
  selected,
  text,
  action,
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
                ${
                  action === "standard" &&
                  `zinc-text border border-b-zinc-300 dark:border-b-zinc-500`
                }
                ${
                  focus &&
                  ` 
                  peer-focus:bg-zinc-200
                  peer-focus:dark:bg-zinc-800
                  peer-focus:border-b-zinc-300
                  peer-focus:dark:border-b-zinc-700
                  peer-focus:text-black
                  peer-focus:dark:text-white
                  duration-200
                `
                }
                ${action === "command" ? "block-mode-command" : ""}
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
