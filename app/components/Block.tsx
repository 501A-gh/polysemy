import { words } from '@/words';
import React, { useRef, useState } from 'react'
import { setTimeout } from 'timers';
import Suggest, { SuggestProps } from './Suggest';
import Command from './Command';

interface BlockTypes extends React.HTMLProps<HTMLButtonElement> {
  index: number,
  word: string,
  text: string[],
  setText: any,
}

export default function Block(props:BlockTypes) {
  const editInputRef = useRef<HTMLInputElement>(null);
  const [commandMode, setCommandMode] = useState<boolean>(false);

  const [editMode, setEditMode] = useState<boolean>(false);
  const [editValue, setEditValue] = useState<SuggestProps["input"]>('');

  const [insertMode, setInsertMode] = useState<boolean>(false);
  const [insertValue, setInsertValue] = useState<string>('');

  const [suggestion, setSuggestion] = useState<SuggestProps["suggestion"]>([]);

  const copy = () => navigator.clipboard.writeText(props.word);
  const backspace = (deletingIndex:number) => props.setText((oldValues:string[]) => oldValues.filter((_:any, i:number) => i !== deletingIndex));

  return (
    <>
      {insertMode && 
        <input
          autoFocus
          className="
            shadow
            focus:outline-none
            font-mono text-xs
            w-fit h-fit
            bg-gray-800
            border border-gray-700
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
          if (e.metaKey) {
            setCommandMode(commandMode ? false:true); 
          }
          if (e.key === 'c') copy();
          if (e.key === "Backspace" || e.key === "Delete") backspace(props.index);
          if (e.key === 'j') backspace(props.index - 1);
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
          border text-sm
          border-transparent
          focus:outline-none
          cursor-pointer
          select-none
          p-0.5 mb-0.5
          rounded-md ` + (editMode || commandMode && `
          text-gray-700 animate-bounce
          `) + (!editMode && !commandMode && `
            focus:px-1.5
            focus:bg-gray-800 
            focus:text-orange-500
            text-gray-300
          `)
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
        <Suggest
          inputRef={editInputRef}
          input={editValue}
          setInput={setEditValue}
          setFocus={setEditMode}
          suggestion={suggestion}
        >
          <input
            autoFocus
            ref={editInputRef}
            onFocus={()=>{
              setEditMode(true)
            }}
            className="
              shadow
              focus:outline-none
              font-mono text-xs
              w-fit h-fit
              bg-gray-800
              border border-gray-700
              py-1
              px-2    
              rounded-md
              ml-0.5
              text-orange-500 
              placeholder:text-orange-500 
            "
            placeholder="Replace ..."
            value={editValue}
            onChange={(e)=>{
              setEditValue(e.target.value);
              const results = words.filter((wrd:any) => {
                if (e.target.value === "") return wrd
                return wrd.toLowerCase().includes(e.target.value.toLowerCase()) 
              })
              setSuggestion(results);
            }}
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
        </Suggest>
      }
      {commandMode &&
        <Command
          index={props.index}
          word={props.word}
          text={props.text}
          setText={props.setText}
          setCommandMode={setCommandMode}
        />
      }
    </>
  )
}
