'use client';
import { useEffect, useState } from 'react';
import Paragraph from './components/Paragraph';
import Header from './components/Header';
import Setting from './components/Setting';
export default function Home() {
  const [paragraph, setParagraph] = useState<[string[]]>([["Welcome","to","Polysemy."]]);

  const [open, setOpen] = useState(false);
  const [displayWordCound, setDisplayWordCound] = useState(false);

  // Toggle the menu when ⌘K is pressed
  useEffect(() => {
    const down = (e:any) => {
      if (e.key === 'k' && e.metaKey) setOpen((open) => !open)
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <>
      <Header status={'[Beta]'}/>
      {open && 
        <Setting
          intent={'highlight'}
          displayWordCound={displayWordCound}
          setDisplayWordCound={setDisplayWordCound}
        />
      }
      <main
        className={`
          flex flex-col 
          pt-5 print:pt-1
          bg-gray-100 
          dark:bg-gray-950       
        `}
      >
        {paragraph.map((p,i) => 
          <Paragraph
            key={i}
            index={i}
            text={p}
            paragraph={paragraph}
            setParagraph={setParagraph}
            displayWordCound={displayWordCound}
          />
        )}
      </main>
    </>
  )
}
