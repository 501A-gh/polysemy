'use client';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import Setting from './components/Setting';

import Image from 'next/image';
import Row from './components/row/Row';

export default function Home() {
  const [paragraph, setParagraph] = useState<[string[]]>([["Welcome","to","Polysemy."]]);

  const [open, setOpen] = useState(false);
  const [displayWordCound, setDisplayWordCound] = useState(false);

  useEffect(() => {
    const down = (e:any) => {
      if (e.key === 'k' && e.metaKey) setOpen((open) => !open)
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const backdropSrc = '';
  // const backdropSrc = 'https://images.unsplash.com/photo-1506202687253-52e1b29d3527?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=8';

  return (
    <>
      {backdropSrc &&
        <Image
          alt={'Wallpaper'}
          placeholder={'blur'}
          blurDataURL={backdropSrc}
          src={backdropSrc}
          width="0"
          height="0"
          sizes="100vw"
          className={`fixed w-full -z-10 h-screen object-cover`}
        />
      }
      {open && 
        <Header>
          <Setting
            intent={'highlight'}
            displayWordCound={displayWordCound}
            setDisplayWordCound={setDisplayWordCound}
          />
        </Header>
      }
      <div
          // grid grid-cols-2
        className={`
        `}
      >
        <section
          className={`
            flex flex-col h-auto pb-auto
            print:pt-1
          `}
        >
          <>
            {paragraph.map((p,i) => 
              <Row
                key={i}
                index={i}
                text={p}
                paragraph={paragraph}
                setParagraph={setParagraph}
                displayWordCound={displayWordCound}
              />
            )}
          </>
        </section>
        {/* <section
            // flex flex-col h-auto pb-auto
            // print:pt-1
            // pt-2
          className={`
            border border-l-gray-400
          `}
        >
        </section> */}
      </div>
    </>
  )
}
