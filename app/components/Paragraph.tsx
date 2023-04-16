import React, { useEffect, useRef, useState } from 'react'
import Caret from './Caret';
import Block from './Block';

interface ParagraphProps{
  index:number,
  text:string[],
  paragraph:any,
  setParagraph:any,
}

export default function Paragraph(props:ParagraphProps) {
  const [selectMode, setSelectMode] = useState(true)
  const [text, setText] = useState<string[]>(props.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(()=>{
    const down = (e:any) => {
      if (e.key === 'Enter' && e.metaKey) setSelectMode(true);
      // if (e.key === 'p' && e.metaKey) {
      //   // setSelectMode(true)
      // }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <>
      {selectMode ? 
        <section
          className={`  
            flex flex-col
            select-none
            p-0.5
            rounded-r-md  
          `}
        >
          <div
            className={`
              flex items-start
            `}
          >
            <button
              autoFocus
              onClick={()=>setSelectMode(false)}
              onKeyDown={(e)=>{
                if (e.key === 'Enter' && e.metaKey) {
                  props.setParagraph([...props.paragraph,[]]);  
                }
                if (e.key === "Backspace" || e.key === "Delete") {
                  if (confirm("Are you sure you want to delete this paragraph?")) {
                    alert(props.index)
                    props.setParagraph((oldValues:[string[]]) => 
                      oldValues.filter((_:any, i:number) => i !== props.index)
                    )
                  }
                }

              }}
              className={`
                focus:outline-none
                text-gray-600
                font-mono text-sm
                mr-1
                rounded-md
                p-1
                border    
                border-transparent
                print:hidden
                focus:bg-orange-500   
                focus:text-black
              `}
            >
              P{props.index}
            </button>
            <p
              className={`
                px-2
                pb-2
                flex
                flex-wrap
                print:px-0
                print:text-black
              `}   
            >
              {text.map((word:string,i:number) => 
                <span
                  key={i}
                  className={`
                    mr-1
                    text-gray-300
                    print:text-black
                  `}
                >
                  {word}
                </span>
              )}
            </p>
          </div>
          {text.length > 0 &&
            <span
              className={`
                font-mono text-xs text-gray-700 ml-auto
                whitespace-nowrap print:hidden
              `}
            >
              {text.length} Words
            </span>
          }
        </section>:  
        <section
          className={`
            flex flex-wrap items-center
            mt-2 mb-2 print:hidden
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
          <Caret
            ref={inputRef}
            // focus={()=> if (inputRef.current != null) {
            //     inputRef.current.focus();
            //   }
            // }
            text={text}
            setText={setText}
            paragraph={props.paragraph}
            setParagraph={props.setParagraph}
          />
        </section>
      }
    </>
  )
}
