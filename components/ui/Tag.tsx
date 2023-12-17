import React from "react";

const Tag: React.FC<{ children: JSX.Element | JSX.Element[] }> = ({
  children,
}) => {
  return (
    <div
      className={`
        border border-zinc-200 dark:border-zinc-800
        bg-gradient-to-t
        to-zinc-200 from-transparent
        dark:to-transparent dark:from-zinc-800
        font-mono text-zinc-600 dark:text-zinc-400
        select-none rounded-full text-xs uppercase
        px-2 py-1 my-0.5 mx-1.5
      `}
    >
      {children}
    </div>
  );
};

export default Tag;
