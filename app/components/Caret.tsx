
import { words } from '@/words'
import React, { useRef, useState } from 'react'
import Suggest, { SuggestProps } from './Suggest'

export default function Caret(props:any) {
  const [focus, setFocus] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null);
  
  const [input, setInput] = useState<SuggestProps["input"]>('');
  const [suggestion, setSuggestion] = useState<SuggestProps["suggestion"]>([]);

  return (
    <Suggest
      inputRef={inputRef}
      input={input}
      setInput={setInput}
      setFocus={setFocus}
      suggestion={suggestion}
    >
      <>
        {focus &&
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
      </>
      <input
        autoFocus
        ref={inputRef}
        onFocus={()=>setFocus(true)}
        onBlur={()=> setFocus(false)}
        className={`
          focus:outline-none
          font-mono text-xs
          w-0 h-fit
          bg-transparent
          p-1
          border
          border-transparent
          text-orange-500
          placeholder:text-orange-500 ` + (focus && 'w-20')}
        placeholder={focus ? "Type ...":""} 
        value={input}
        onChange={(e)=>{
          setInput(e.target.value);
          const results = words.filter((wrd:any) => {
            if (e.target.value === "") return wrd
            return wrd.toLowerCase().includes(e.target.value.toLowerCase()) 
          })
          setSuggestion(results);
        }}
        onKeyDown={(e) => {
          setFocus(true)
          if (e.key === ' ') {
            props.setText([...props.text, input])
            setTimeout(() => setInput(''), 1);
          }
          // if (e.key === 'Enter  ' && e.metaKey  && props.text.length > 0) {
            // props.setParagraph([...props.paragraph, [props.text]]) ;
            // props.setText([]);
          // };
        }}
      />
    </Suggest>
  )
}
