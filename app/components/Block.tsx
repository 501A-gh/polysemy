import { words } from '@/words';
import React, { useEffect, useRef, useState } from 'react'
import { setTimeout } from 'timers';
import Suggest, { SuggestProps } from './Suggest';
import Command from './Command';
import { VariantProps, cva } from 'class-variance-authority';
import Highlight from './Highlight';

interface BlockTypes extends React.HTMLProps<HTMLButtonElement> {
  index: number,
  word: string,
  text: string[],
  setText: any,
  highlightPoint:number[],
  setHighlightPoint:any,
}

const blockButton = cva("button", {
  variants: {
    intent: {
      command: [
        "text-gray-700",
        "animate-pulse",
      ],
      edit: [
        "text-gray-700",
        "animate-bounce",
      ],
      standard:[
        "focus:px-1.5",
        "text-gray-300",
        "focus:bg-gray-800 ",
        "focus:text-orange-500",
      ],
      highlight:[
        "rounded-none",
        "text-gray-900",
        "bg-lime-500",
        "focus:bg-lime-700",
      ]
    },
  },
  defaultVariants:{
    intent:"standard"
  }
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof blockButton> {
  icon?:JSX.Element
}

const BlockButton: React.FC<ButtonProps> = ({
  className,
  intent,
  icon,
  ...props
}) => (
  <button
    className={
      blockButton({ intent, className }) + 
      ` 
        border 
        text-sm
        border-transparent
        focus:outline-none
        cursor-pointer
        select-none
        p-0.5 my-0.5
        rounded-md
      `
    }
    {...props}
  >
    {icon}
    {props.children}
  </button>
);

// interface CurrentMode extends VariantProps<typeof blockButton>{
//   mode:
// }

export default function Block(props:BlockTypes) {
  const editInputRef = useRef<HTMLInputElement>(null);
  const [currentMode, setCurrentMode] = useState<any>();

  const [editValue, setEditValue] = useState<SuggestProps["input"]>('');
  const [insertValue, setInsertValue] = useState<string>('');

  const [suggestion, setSuggestion] = useState<SuggestProps["suggestion"]>([]);

  const copy = () => navigator.clipboard.writeText(props.word);
  const backspace = (deletingIndex:number) => props.setText((oldValues:string[]) => oldValues.filter((_:any, i:number) => i !== deletingIndex));


  let highlightIndex:number[] = []
  let sortedHighlightPoint = props.highlightPoint.sort();
  let highlightPointStart:number = sortedHighlightPoint[0];
  let highlightPointEnd:number = sortedHighlightPoint[props.highlightPoint.length-1];

  // useEffect(()=>{
  //   // highlightIndex = [];
  // },[])
  
  for (let i = highlightPointStart; i < highlightPointEnd+1; i++) {
    highlightIndex.push(i);
  }
  console.log(highlightIndex)


  // useEffect(() => {
  //   if (props.highlight.length === 2) {
  //     props.setHighlight()
  //     se
  //   }
  // }, [])

  // console.log(props.highlight)
  

  return (
    <>
      {currentMode === 'insert' && 
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
            ml-0.5 my-0.5
            text-orange-500 
            placeholder:text-orange-500 
          "
          placeholder="Insert ..."
          value={insertValue}
          onChange={(e)=>setInsertValue(e.target.value)}
          onBlur={()=>setCurrentMode('insert')}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              let temp:string[] = [...props.text];
              insertValue.split(" ").reverse().map((word:string) =>{
                temp.splice(props.index, 0, word);
              })
              props.setText(temp)
              setCurrentMode('standard');
            }
          }}
        />
      }

      <BlockButton
        intent={highlightIndex.includes(props.index) ? 'highlight':currentMode}
        onBlur={props.onBlur}
        onClick={()=>{
          setCurrentMode('edit');
          setTimeout(() => setEditValue(''), 1)
        }}
        onKeyDown={(e) => {
          if (e.key === 'o') {
            currentMode === 'command' ? setCurrentMode('standard'):setCurrentMode('command')
          }
          if (e.key === 'c') copy();
          if (e.key === "Backspace" || e.key === "Delete") backspace(props.index);
          if (e.key === 'j') backspace(props.index - 1);
          if (e.key === 'r') {
            setCurrentMode('edit');
            setTimeout(() => setEditValue(''), 1)
          };
          if (e.key === 'i') {
            setCurrentMode('insert');
            setTimeout(() => setInsertValue(''), 1)
          };
          if (e.key === 'h') {
            if (highlightIndex.includes(props.index)) {
              props.setHighlightPoint([])
            }else if(props.highlightPoint.length == 2){
              alert('cannot highlight');
            }else{
              props.setHighlightPoint([...props.highlightPoint,props.index])
            }
          };
          if (e.key === "x") {
            copy();
            backspace(props.index);
          };
        }}
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
      </BlockButton>

      {currentMode === 'edit' && 
        <Suggest
          inputRef={editInputRef}
          input={editValue}
          setInput={setEditValue}
          setCurrentMode={setCurrentMode}
          suggestion={suggestion}
        >
          <input
            autoFocus
            ref={editInputRef}
            onFocus={()=>setCurrentMode('edit')}
            className="
              shadow my-0.5
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
                setCurrentMode('standard');
              }
            }}
          />
        </Suggest>
      }
      {currentMode === 'command' &&
        <Command
          index={props.index}
          word={props.word}
          text={props.text}
          setText={props.setText}
          setCurrentMode={setCurrentMode}
        />
      }
      {
        props.highlightPoint.length === 2 && 
        sortedHighlightPoint[props.highlightPoint.length-1] === props.index &&
        <Highlight
          highlightPoint={props.highlightPoint}
          setHighlightPoint={props.setHighlightPoint}
          setCurrentMode={setCurrentMode}
        />
      }
    </>
  )
}
