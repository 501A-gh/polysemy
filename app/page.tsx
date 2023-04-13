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
      {/* <footer
        className="
          font-mono text-sm
          sticky
             bottom-0
          flex items-center justify-between
          p-0.5
          bg-slate-700
        "
      >
        <input
          className="
            font-mono text-sm
            p-1
            w-auto h-fit
            border-gray-700
            bg-gray-800
          "
          placeholder="Text Goes Here ..."
          // value={text}
        />  
      </footer> */}
    </>
  )
}
