import { Button } from "./Button";

export interface SuggestProps {
  inputRef?: any;
  input: string | "";
  setInput: any;
  suggestion: string[];
  children: JSX.Element | JSX.Element[];
  onFocus?: any;
}

const Suggest: React.FC<SuggestProps> = ({
  input,
  suggestion,
  setInput,
  inputRef,
  onFocus,
  ...props
}) => {
  return (
    <>
      {props.children}
      {input?.length > 2 && (
        <>
          {suggestion.map((s: string) => (
            <Button
              intent={"word"}
              key={s}
              onClick={() => {
                setInput(s);
                onFocus(true);
                if (inputRef.current != null) {
                  inputRef.current.focus();
                }
              }}
            >
              {s}
            </Button>
          ))}
        </>
      )}
    </>
  );
};
export default Suggest;
