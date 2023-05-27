import React, { useEffect, useState } from "react";

interface EditModeProps extends React.HTMLAttributes<HTMLDivElement> {
  setSelectMode: any;
}

const EditMode: React.FC<EditModeProps> = ({ setSelectMode, ...props }) => {
  const [highlightPoint, setHighlightPoint] = useState([]);

  useEffect(() => {
    const down = (e: any) => {
      if (e.key === "Enter" && e.metaKey) setSelectMode(true);
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <div
      className={`
        flex flex-wrap items-center
        py-1
        px-2
        print:hidden
        border
        border-x-2
        
        bg-white/80
        border-y-gray-200
        
        dark:bg-gray-950/90
        dark:border-y-gray-900
        
        border-x-orange-500
        dark:border-x-orange-600
      `}
      {...props}
    >
      {props.children}
    </div>
  );
};

export default EditMode;
