import React, { useState } from 'react'
import { Button, ButtonProps } from './Button'
import { MagicWandIcon, Pencil1Icon, TransformIcon } from '@radix-ui/react-icons';

interface CommandButtonProps extends ButtonProps{
  name:string,
  apiRoute:string
}

const options:CommandButtonProps[] = [
  {
    icon:<Pencil1Icon/>,
    name:"Synonym",
    apiRoute:"ml",
  },
  {
    icon:<TransformIcon/>,
    name:"Correlated",
    apiRoute:"rel_trg",
  },
  {
    icon:<MagicWandIcon/>,
    name:"Rhyme",
    apiRoute:"rel_rhy",
  }
];


export default function Command(props:any) {
  const [response, setResponse] = useState([])
  const [commandType, setCommandType] = useState('')
  
  async function fetchApi(apiRoute:string){
    const response = await fetch(`https://api.datamuse.com/words?${apiRoute}=${props.word}`);
    const responseJsonData = await response.json();
    console.log(responseJsonData)
    if (responseJsonData.length > 0) {
      setResponse(responseJsonData)
    }
  }

  return (
    <section
      className={`
        flex
        items-center
        ml-1
        gap-1
        w-fit
        mb-0.5
      `}
    >
      {
        response.length > 0 ?
          <>
            {
              response.slice(0, 3).map((obj:any, i:number)=>        
                <Button
                  key={i}
                  // onClick={()=>{
                  //   props.setInput(suggestedText);
                  //   props?.setFocus(true);
                  // }}
                  onBlur={()=>setResponse([])}
                >
                  {obj.word}
                </Button>
              )
            }            
          </>:
          <>
            {options.map((obj:CommandButtonProps, i:number)=>        
              <Button
                key={i}
                intent={'action'}
                icon={obj.icon}
                onClick={()=>{
                  fetchApi(obj.apiRoute)
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
