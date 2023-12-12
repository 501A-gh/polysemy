import React from "react";

export interface InsertInputSpaceProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected: number[];
  blockIndex: number;
}

const InsertInputSpace: React.FC<InsertInputSpaceProps> = ({
  selected,
  blockIndex,
  ...props
}) => {
  return (
    <button
      title="Click To Insert"
      tabIndex={-1}
      className={`
        select-none h-6 cursor-text group
        duration-700 transition-all
        hover:mx-0 hover:w-20 hover:px-1
        ${selected.includes(blockIndex) ? " w-0" : "w-3 -mx-1"}
      `}
      {...props}
    >
      <div
        className={`
        w-full h-full
        border
        border-dashed
        border-transparent
        rounded
        group-hover:border-zinc-400
        group-hover:dark:border-zinc-700
        group-hover:animate-pulse
        group-hover:scale-105
        group-hover:shadow-lg
      `}
      />
    </button>
  );
};

export default InsertInputSpace;
