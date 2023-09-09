import React from "react";

const FunctionBar = ({ ...props }) => {
  return (
    <footer className={`w-full flex justify-center p-2.5`}>
      <div
        className={`
          bg-gradient-to-b -translate-y-2
          from-white
          dark:from-gray-900
          to-gray-100
          dark:to-black gap-[1px]
          absolute transition-all
          animate-show h-fit w-fit
          py-0.5 px-1 rounded-md 
          border border-gray-200/50 dark:border-gray-900 
          flex flex-row shadow-2xl
        `}
      >
        {props.children}
      </div>
    </footer>
  );
};

export default FunctionBar;
