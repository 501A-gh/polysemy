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

  const closeCommandMode = () =>{
    setResponse([])
    props.setCommandMode(false);
  }
  
  async function fetchApi(apiRoute:string){
    const response = await fetch(`https://api.datamuse.com/words?${apiRoute}=${props.word}`);
    const responseJsonData = await response.json();
    console.log(responseJsonData)
    if (responseJsonData.length > 0) {
      setResponse(responseJsonData)
    }else{
      alert('None found.')
    }
  }

  return (
    <>
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
            {options.map((obj:CommandButtonProps, i:number)=>        
              <Button
                key={i}
                intent={'action'}
                icon={obj.icon}
                onClick={()=>{
                  fetchApi(obj.apiRoute)
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

    </>
  )
}
