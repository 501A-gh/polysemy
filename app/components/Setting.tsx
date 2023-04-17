import React, { useState } from 'react'
import { Button, ButtonProps } from './Button'
import { ClipboardIcon, ColorWheelIcon, CubeIcon, MagicWandIcon, Pencil1Icon, TransformIcon } from '@radix-ui/react-icons';

interface SettingButtonProps extends ButtonProps{
  name:string,
  action:Function,
  intent:'highlight' | 'standard'
}

export default function Setting(props:any) {
  const [response, setResponse] = useState([])
  const [commandType, setCommandType] = useState('')
  const changeTheme = () =>{
    console.log('bruh')
  }

  const options:SettingButtonProps[] = [
    {
      icon:<CubeIcon/>,
      name:"Feed data",
      action:props.consume,
      intent:'standard'
    },
    {
      icon:<ColorWheelIcon/>,
      name:"Editor theme",
      action:changeTheme(),
      intent:'standard'
    },
    {
      icon:<MagicWandIcon/>,
      name:"Copy all text ",
      action:props.copyAllRaw,
      intent:'standard'
    },
  ];

  const closeCommandMode = () =>{
    setResponse([])
    props.setCommandMode(false);
  }
  
  async function fetchApi(apiRoute:string){
  }

  return (
    <section
      className={`
        px-10 py-2 print:hidden font-serif select-none
        border border-transparent border-b-gray-800
        bg-black overflow-x-auto shadow-lg
        flex items-center
      `}    
    >
      {
        response.length > 0 ?
          <>
            {
              response.slice(0, 15).map((obj:any, i:number)=>        
                <Button
                  key={i}
                  onClick={()=>{
                    let temp:string[] = [...props.text];
                    temp.map((_:any, i:number) => {
                      if (i == props.index) temp[i] = obj.word
                    });
                    props.setText(temp);
                    closeCommandMode();
                  }}
                  onKeyDown={(e)=>{
                    if (e.metaKey) closeCommandMode()
                  }}
                >
                  {obj.word}
                </Button>
              )
            }            
          </>:
          <>
            {options.filter((obj:SettingButtonProps) => obj.intent === props.intent).map((obj:SettingButtonProps, i:number)=>        
              <Button
                key={i}
                intent={props.intent}
                icon={obj.icon}
                onClick={()=>{
                  // fetchApi(obj.apiRoute)
                }}
                onKeyDown={(e)=>{
                  if (e.metaKey) closeCommandMode()
                }}
              >
              {obj.name} 
              </Button>
            )}
          </>
      }
    </section>
  )
}
