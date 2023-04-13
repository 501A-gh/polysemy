
import React, { useState } from 'react'

export default function Suggest(props:any) {
  const [input, setInput] = useState<string>('')
  const [focus, setFocus] = useState<boolean>(false)

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
          {/* {
            focus && */}
            <div
              className={`
                bg-orange-500
                w-4
                h-4
                rounded-lg
                ease-out
              `}
            />
          {/* } */}
          <input
            autoFocus
            autoCorrect='bruh '
            onFocus={()=>setFocus(true)}
            onBlur={()=>setFocus(false)}
            className={`
              focus:outline-none
              font-mono text-sm
              w-fit h-fit
              bg-transparent
              text-orange-500
              placeholder:text-orange-500 ` + (!focus && 'w-0 ')}
            placeholder={focus ? "Type ...":""} 
            value={input}
            onChange={(e)=>setInput(e.target.value)}
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
            {/* <button
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
              Select
            </button> */}
        </section>
      }
    </>
  )
}
