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
  const backspace = () => props.setText((oldValues:string[]) => oldValues.filter((_:any, i:number) => i !== props.index));

  return (
    <>
      {insertMode && 
        <input
          autoFocus
          className="
            focus:outline-none
            font-mono text-sm
            w-fit h-fit
            bg-slate-800
            border-b
            p-1
            rounded-t-sm
            ml-0.5
            text-orange-400
            border-orange-400
            placeholder:text-orange-400
          "
          placeholder="Insert ..."
          value={insertValue}
          onChange={(e)=>setInsertValue(e.target.value)}
          onBlur={()=>setInsertMode(false)}
          onKeyDown={(e) => {
            if (e.key === ' ') {
              let temp:string[] = [...props.text];
              temp.splice(props.index, 0, insertValue);
              props.setText(temp)
              setInsertMode(false);
            }
          }}
        />
      }


      <button
        onKeyDown={(e) => {
          if (e.key === 'c') copy();
          if (e.key === "Backspace" || e.key === "Delete") backspace();
          if (e.key === 'e') {
            setEditMode(true);
            setTimeout(() => setEditValue(''), 1)
          };
          if (e.key === 'i') {
            setInsertMode(true);
            setTimeout(() => setInsertValue(''), 1)
          };
          if (e.key === "x") {
            copy();
            backspace();
          };
        }}
        className={`
          focus:outline-none
        focus:bg-slate-700
          cursor-pointer
          select-none
          p-0.5
          rounded-sm
          blur-show-ani ` + (editMode ? 'text-slate-700':'text-slate-300')
        }
      >
        {props.word}
        {props.word.at(-1) == '.' && 
          <small
            className="
              text-slate-500
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
            bg-slate-800
            border-b
            p-1
            rounded-t-sm
            ml-0.5
            text-orange-400
            border-orange-400
            placeholder:text-orange-400
          "
          placeholder="Edit ..."
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
