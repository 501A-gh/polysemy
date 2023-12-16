import { ActionTypes, checkBlockIntent } from "@/util/helper/globalUtilities";
import React, { useState } from "react";

interface GroupPrimitiveBlockProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  ref: any;
  blockIndex: number;
  selected: number[];
  text: string;
  action: ActionTypes;
}

const GroupPrimitiveBlock: React.FC<GroupPrimitiveBlockProps> = ({
  ref,
  blockIndex,
  selected,
  text,
  action,
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
        <>
          {checkBlockIntent(w) === "word" && (
            <span
              {...props}
              key={i}
              className={`
                block
                ${
                  selected.includes(blockIndex)
                    ? `block-mode-highlight`
                    : `
                    ${
                      action === "standard" || action === "insert"
                        ? `block-mode-standard`
                        : ""
                    }
                    ${i === 0 && "rounded-l-sm"}
                    ${i === text.split(" ").length - 1 && "rounded-r-sm"}
                    ${
                      focus &&
                      `
                        peer-focus:bg-zinc-200
                        peer-focus:dark:bg-zinc-800
                        peer-focus:border-b-zinc-300
                        peer-focus:dark:border-b-zinc-700
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
          )}
          {checkBlockIntent(w) === "link" && <h1>w</h1>}
        </>
      ))}
    </>
  );
};

export default GroupPrimitiveBlock;
