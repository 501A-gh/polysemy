import React, { useState } from 'react'
import { Button, ButtonProps } from './Button'
import { ClipboardIcon, Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';

interface HighlightActionButtonProps extends ButtonProps{
  name:string,
  action:any
}

interface HighlightProps{
  text:string[],
  backspace:any,
  highlightIndex:number[],
  highlightPoint:number[],
  setHighlightPoint:any,
  setCurrentMode:any,
  paragraph:any,
  setParagraph:any
}

export default function Highlight(props:HighlightProps) {
  const exitHighlight = () => {
    props.setCurrentMode('standard')
    props.setHighlightPoint([])
  }

  const backspaceMultiple = (array:number[]) =>{
    array.forEach(i => props.backspace(i));
    exitHighlight()
  } 

  const sentence = () => {
    let highlightedSectence:string[][] = [];
    let tempWord:string[] = [];
    props.highlightIndex.forEach(i => {
      tempWord = props.text.filter(word => props.text.indexOf(word) === i)
      highlightedSectence.push(tempWord)
    })
    return highlightedSectence.flat().join(" ")
  }

  const copyRawText = () =>{
    navigator.clipboard.writeText(sentence());
    exitHighlight();
  }

  const moveToNewParagraph = () => {
    props.setParagraph([...props.paragraph, sentence().split(" ")])
    backspaceMultiple(props.highlightIndex);
  }

  const options:HighlightActionButtonProps[] = [
    {
      icon:<ClipboardIcon/>,
      name:"Copy raw text ",
      action:() => copyRawText(), 
    },
    {
      icon:<Pencil1Icon/>,
      name:"Move to new paragraph",
      action:() => moveToNewParagraph(),
    },
    {
      icon:<TrashIcon/>,
      name:"Delete",
      action:() => backspaceMultiple(props.highlightIndex),
    }
  ];

  return (
    <>
      {options.map((obj:HighlightActionButtonProps, i:number)=>        
        <Button
          key={i}
          intent={'highlight'}
          icon={obj.icon}
          onClick={obj.action}
          onKeyDown={(e)=>{
            if (e.key === 'h') exitHighlight()
          }}
        >
        {obj.name} 
        </Button>
      )}
    </>
  )
}
