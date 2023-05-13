import React from 'react'

interface EditModeRowProps
  extends React.HTMLAttributes<HTMLDivElement> {
}

export const EditModeRow: React.FC<EditModeRowProps> = ({
  className,
  ...props
}) => (
  <div
    className={
      `
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
      `
    }
    {...props}
  >
    {props.children}
  </div>
);