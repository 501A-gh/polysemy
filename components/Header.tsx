import React from 'react'
import { Tab } from './Tab'


export default function Header({children}:{children:any}) {
  return (
    <header
      className={`
        z-10
        sticky top-0
        print:hidden 
         select-none
        border-b
        border-b-gray-300
        bg-gray-100
        dark:border-b-gray-800
        dark:bg-gray-950
      `}
    >
      <section
        className={`
          flex items-center justify-between
        `}
      >
        <div
          className={`
            flex items-center
          `}
        >
          <Tab
            focus
          >
            Untitled
          </Tab>

          {/* <Tab
            focus={false}
          >
            Untitled 2
          </Tab> */}
        </div>

        <div
          className={`
            bg-gradient-to-tr 
            from-gray-800 
            to-gray-950
            focus:outline-none
            p-1
          `}
        >
          <h1 
            className={`
              text-sm mx-2 
              whitespace-nowrap
              text-white font-serif
            `}
          >
            Polysemy.
          </h1>
        </div>
      </section>
      {children}
    </header>
  )
}
