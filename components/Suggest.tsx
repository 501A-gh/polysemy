import { Button } from "./Button";

export interface SuggestProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  inputRef: any;
  input: string | "";
  setInput: any;
  suggestion: string[];
  children: JSX.Element | JSX.Element[];
  onFocus?: any;
  focusOnInput?: any;
}

const Suggest: React.FC<SuggestProps> = ({
  input,
  suggestion,
  setInput,
  inputRef,
  // onFocus,
  focusOnInput,
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
                focusOnInput();
              }}
              // onKeyDown={(e) => {
              //   if (e.key === "Enter") {
              //   }
              // }}
              {...props}
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
