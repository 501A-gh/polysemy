import React, { useState } from 'react'
import { Button, ButtonProps } from './Button'
import { ClipboardIcon, Pencil1Icon, ScissorsIcon, TrashIcon } from '@radix-ui/react-icons';

interface HighlightActionButtonProps extends ButtonProps{
  name:string,
  action:any
}

const options:HighlightActionButtonProps[] = [
  {
    icon:<ScissorsIcon/>,
    name:"Cut",
    action:console.log(),
  },
  {
    icon:<ClipboardIcon/>,
    name:"Copy raw text ",
    action:console.log(),
  },
  {
    icon:<Pencil1Icon/>,
    name:"Move to new paragraph",
    action:console.log(),
  },
  {
    icon:<TrashIcon/>,
    name:"Delete",
    action:console.log(),
  }
];


export default function Highlight(props:any) {
  const [response, setResponse] = useState([])
  const [commandType, setCommandType] = useState('');

  const exitHighlight = () => {
    props.setCurrentMode('standard')
    props.setHighlightPoint([])
  }

  return (
    <>
      {options.map((obj:HighlightActionButtonProps, i:number)=>        
        <Button
          key={i}
          intent={'highlight'}
          icon={obj.icon}
          onClick={()=>props.action}
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
