
import { words } from '@/words'
import React, { useRef, useState } from 'react'

export default function Suggest(props:any) {
  const [input, setInput] = useState<string>('')
  const [focus, setFocus] = useState<boolean>(false)
  const [suggestion, setSuggestion] = useState<object[]>([])
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      {
        !props.editMode ?
        <div
          className="
            flex
            align-center
            gap-1
          "
        >
          {props.suggestion.map((data:any,i:number) => <span key={i}>{data}</span>)}
        </div>:
        <section
          className="
            flex
            items-center
            ml-1
            gap-1
          "
        >
          {
            focus &&
            <div
              className={`
                bg-orange-500
                w-4
                h-4
                rounded-lg
                ease-out
              `}
            />
          }
          <input
            autoFocus
            ref={inputRef}
            onFocus={()=>setFocus(true)}
            onBlur={()=>{
              setFocus(false)
              // setInput('')
            }}
            className={`
              focus:outline-none
              font-mono text-sm
              w-0 h-fit
              bg-transparent
              text-orange-500
              placeholder:text-orange-500 ` + (focus && 'w-20')}
            placeholder={focus ? "Type ...":""} 
            value={input}
            onChange={(e)=>{
              setInput(e.target.value);
              const results = words.filter((obj:any) => {
                if (e.target.value === "") return obj
                return obj.word.toLowerCase().includes(e.target.value.toLowerCase())
              })
              setSuggestion(results);
            }}
            onKeyDown={(e) => {
              setFocus(true)
              if (e.key === ' ') {
                props.setText([...props.text,input])
                setTimeout(() => {setInput('')}, 1);
              }
              // if (e.key === 'Enter  ' && e.metaKey  && props.text.length > 0) {
                // props.setParagraph([...props.paragraph, [props.text]]) ;
                // props.setText([]);
              // }; 
            }}
          />

          <section
            className={`
              flex
              items-center
              ml-1
              gap-1
              w-fit
            `}
          >
            {input?.length > 0 && 
              <>            
                {
                  suggestion.slice(0, 4).map((suggestedText:any) =>
                    <button 
                      key={suggestedText.word}
                      onClick={() => {
                        setInput('');
                        props.setText([...props.text,suggestedText.word])
                        setFocus(true);
                        if (inputRef.current != null) {
                          inputRef.current.focus();
                        }
                      }}
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
                      {suggestedText?.word}
                    </button>
                  )
                }
              </>
            }
          </section>
        </section>
      }
    </>
  )
}
