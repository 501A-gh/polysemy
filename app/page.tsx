'use client';
import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react';
import Paragraph from './components/Paragraph';
// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [paragraph, setParagraph] = useState<[string[]]>([["Welcome","to","Polysemy."]]);

  // const [open, setOpen] = useState(false)

  // // Toggle the menu when ⌘K is pressed
  // useEffect(() => {
  //   const down = (e:any) => {
  //     if (e.key === 'k' && e.metaKey) setOpen((open) => !open)
  //   }
  //   document.addEventListener('keydown', down)
  //   return () => document.removeEventListener('keydown', down)
  // }, [])

  return (
    <>
      <main className="flex flex-col min-h-screen">
        <section className="p-10">
          <div className="mb-10 print:hidden">
            <h1 className="text-2xl font-serif whitespace-nowrap">
              Polysemy.{" "}
              <span className="text-xs font-sans text-orange-500">
                [Beta]
              </span>
            </h1>
            <h6 className="text-xs font-serif">
              The blockbased text editor
            </h6>
          </div>
          <div className="flex flex-col">
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
        </section>
      </main>
    </>
  )
}
