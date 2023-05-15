import React, { useEffect, useState } from "react";

interface EditModeProps extends React.HTMLAttributes<HTMLDivElement> {}

const EditMode: React.FC<EditModeProps> = ({ ...props }) => {
  const [highlightPoint, setHighlightPoint] = useState([]);

  return (
    <div
      className={`
        flex
        flex-wrap
        items-center
        py-1
        pl-2
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
