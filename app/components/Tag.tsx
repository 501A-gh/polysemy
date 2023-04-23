import React from 'react'

export default function Tag({children}:{children:any}) {
  return (
    <span
      className={` 
        font-mono
        text-black
        dark:text-white
        bg-gray-300
        dark:bg-gray-800 
        shadow-gray-300-highlight
        dark:shadow-gray-700-highlight
        select-none rounded-sm
        ease-out 
        text-xs
        px-2
        py-1
        my-0.5
        uppercase
      `}
    >
      {children}
    </span>
  )
}
