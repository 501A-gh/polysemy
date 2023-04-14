import React, { useState } from 'react'
import { setTimeout } from 'timers';

interface BlockTypes extends React.HTMLProps<HTMLButtonElement> {
  index: number,
  word: string,
  text: string[],
  setText: any,
}

export default function Block(props:BlockTypes) {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editValue, setEditValue] = useState<string>('');

  const [insertMode, setInsertMode] = useState<boolean>(false);
  const [insertValue, setInsertValue] = useState<string>('');


  const copy = () => navigator.clipboard.writeText(props.word);
  const backspace = (deletingIndex:number) => props.setText((oldValues:string[]) => oldValues.filter((_:any, i:number) => i !== deletingIndex));

  return (
    <>
      {insertMode && 
        <input
          autoFocus
          className="
            focus:outline-none
            font-mono text-sm
            w-fit h-fit
            bg-gray-800
            border border-gray-800
            py-1
              px-2    
            rounded-md
            ml-0.5
            text-orange-500 
            placeholder:text-orange-500 
          "
          placeholder="Insert ..."
          value={insertValue}
          onChange={(e)=>setInsertValue(e.target.value)}
          onBlur={()=>setInsertMode(false)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              let temp:string[] = [...props.text];
              insertValue.split(" ").reverse().map((word:string) =>{
                temp.splice(props.index, 0, word);
              })
              props.setText(temp)
              setInsertMode(false);
            }
          }}
        />
      }

      <button 
        onBlur={props.onBlur}
        onClick={()=>{
          setEditMode(true);
          setTimeout(() => setEditValue(''), 1)
        }}
        onKeyDown={(e) => {
          if (e.key === 'c') copy();
          if (e.key === "Backspace" || e.key === "Delete") backspace(props.index);
          // if (e.altKey && e.key === 'j') {
          //   backspace(props.index - 1);
          // }
          if (e.key === 'r') {
            setEditMode(true);
            setTimeout(() => setEditValue(''), 1)
          };
          if (e.key === 'i') {
            setInsertMode(true);
            setTimeout(() => setInsertValue(''), 1)
          };
          if (e.key === "x") {
            copy();
            backspace(props.index);
          };
        }}
        className={`
          focus:outline-none
          focus:bg-gray-700 
          focus:text-gray-200
          cursor-pointer
          select-none
          p-0.5
          rounded-sm ` + (editMode ? 'text-gray-700 animate-bounce':'text-gray-300  ')
        }
      >
        {props.word}
        {props.word?.at(-1) == '.' && 
          <small
            className="
              text-gray-500
              ml-1
            "
          >
            ({props.index+1} Words Until Here)
          </small>
        }
      </button>

      {editMode && 
        <input
          autoFocus
          className="
            focus:outline-none
            font-mono text-sm
            w-fit h-fit
            bg-gray-800
            border border-gray-800
            py-1
            px-2    
            rounded-md
            ml-0.5
            text-orange-500 
            placeholder:text-orange-500 
          "
          placeholder="Replace ..."
          value={editValue}
          onChange={(e)=>setEditValue(e.target.value)}
          onBlur={()=>setEditMode(false)}
          onKeyDown={(e) => {
            if (e.key === ' ') {
              let temp:string[] = [...props.text];
              temp.map((_:any, i:number) => {
                if (i == props.index) temp[i] = editValue
              });
              props.setText(temp)
              setEditMode(false);
            }
          }}
        />
      }
    </>
  )
}
