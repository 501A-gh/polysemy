import React from 'react'


export default function Header({status}:{status:string}) {
  return (
    <header
      className={`
        px-10 py-7 print:hidden font-serif select-none
        border border-black border-b-gray-800
        bg-gradient-to-r from-gray-950 to-black
      `}
    >
      <h1 className="text-2xl whitespace-nowrap">
        Polysemy.{" "}
        {status && 
          <span className="text-xs font-mono text-orange-500">
            {status}
          </span>
        }
      </h1>
      <h6 className="text-xs">
        The blockbased text editor
      </h6>
    </header>
  )
}
