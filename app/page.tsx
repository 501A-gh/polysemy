'use client';
import { Inter } from 'next/font/google'
import Block from './components/Block'
import { useRef, useState } from 'react';
import Suggest from './components/Suggest';
import Paragraph from './components/Paragraph';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const inputRef = useRef(null);  
  const [text, setText] = useState<string[]>([]);
  const [paragraph, setParagraph] = useState<[][]>([]);
  paragraph.map(p => 
    p.map((word) =>{
      console.log
    })
  )

  return (
    <>
      <main className="flex flex-col min-h-screen">
        <section className="p-10">
          <h1 className="text-xl whitespace-nowrap">Polysemy.</h1>
          <br/>
          {paragraph.map(p => 
            <Paragraph text={p}/>
          )}
          <section
            className={`
              flex flex-wrap items-center
              mt-2
            `}
          >
            {
              text.length > 0 &&
              text.map((word:string, i:number) => (
                <Block
                  key={i}
                  index={i}
                  word={word}
                  text={text}
                  setText={setText}
                />
              ))
            }
            <Suggest
              editMode={true}
              text={text}
              setText={setText}
              paragraph={paragraph}
              setParagraph={setParagraph}
            />
          </section>
        </section>
      </main>
      <footer
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
        <p>
          {text.length} Words
        </p>
      </footer>
    </>
  )
}
