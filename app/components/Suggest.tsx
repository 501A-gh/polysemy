import { Button } from "./Button";

export interface SuggestProps{
  inputRef?:any
  input:string | '',
  setInput:any,
  setFocus?:any,
  suggestion:string[],
  children:JSX.Element | JSX.Element[],
  onFocus?:any,
}

export default function Suggest(props:SuggestProps) {
  return (
    <>
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
        {props.children}
        {props.input?.length > 0 && 
          <>
            {props.suggestion.slice(0, 3).map(suggestedText =>
              <Button 
                key={suggestedText}
                onClick={() => {
                  props.setInput(suggestedText);
                  props?.setFocus(true);
                  if (props?.inputRef.current != null) {
                    props?.inputRef.current.focus();
                  }
                }}
              >
                {suggestedText}
              </Button>
            )}
          </>
        }
      </section>
    </>
  )
}
