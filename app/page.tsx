'use client';
import { Inter } from 'next/font/google'
import { useState } from 'react';
import Paragraph from './components/Paragraph';

// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [paragraph, setParagraph] = useState<[string[]]>([["Welcome","to","Polysemy."]]);

  return (
    <>
      <main className="flex flex-col min-h-screen">
        <section className="p-10">
          <h1 className="text-2xl font-serif whitespace-nowrap">
            Polysemy.
          </h1>
          <br/>
          <div
            className={`
              flex flex-col
            `}
          >
            {paragraph.map((p,i) => 
              <Paragraph
                key={i}
                index={i}
                text={p}
                paragraph={paragraph}
                setParagraph={setParagraph}
              />
            )}
          </div>
          {/* <Editor
            text={text}
            setText={setText}
            cursor={
              <Suggest
                editMode={true}
                text={text}
                setText={setText}
                paragraph={paragraph}
                setParagraph={setParagraph}
              />
            }
          /> */}
        </section>
      </main>
      <footer
        className="
          font-mono text-sm
          sticky
          bottom-0
          flex items-center justify-between
          p-0.5
          bg-gray-700
        "
      >
        <button
          className={`
            rounded-md
            py-0.5
            px-1.5
            bg-gray-900
            text-gray-500 
            focus:outline-none
            border
            border-transparent
            focus:border-gray-700
          `}
        >
          Export as PDF
        </button>
      </footer>
    </>
  )
}
