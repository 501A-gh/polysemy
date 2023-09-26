import React, { ButtonHTMLAttributes } from "react";

interface WidgetProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const Widget: React.FC<WidgetProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={`
        py-1 px-2.5 rounded-md outline-none flex items-center gap-2
        material-solid shadow-lg shadow-zinc-200/50 dark:shadow-zinc-900/50
        font-mono text-xs select-none whitespace-nowrap 
        focus:shadow-none 
        zinc-text
        focus:text-zinc-900
        dark:focus:text-zinc-100
        focus:border-zinc-300
        focus:dark:border-zinc-700
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Widget;
