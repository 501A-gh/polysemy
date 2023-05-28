import React from "react";

const FunctionBar = ({ ...props }) => {
  return (
    <footer
      className={`absolute bottom-0 left-0 right-0 flex justify-center p-5`}
      // absolute bottom-0 p-1 rounded-2xl
    >
      <div
        className={` animate-show
          bg-gradient-to-b 
          from-white 
          dark:from-gray-900 
          to-gray-100 
          dark:to-black 
          p-2 rounded-lg 
          border border-white dark:border-gray-900 
          flex flex-row shadow-2xl
        `}
      >
        {props.children}
      </div>
    </footer>
  );
};

export default FunctionBar;
