export interface SuggestProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  input: string | "";
  setInput: any;
  suggestion: string[];
  focusOnClick: any;
  className: string;
}

const Suggest: React.FC<SuggestProps> = ({
  input,
  setInput,
  suggestion,
  focusOnClick,
  className,
  ...props
}) => {
  return (
    <>
      {input?.length > 2 &&
        suggestion.map((s: string, i: number) => (
          <button
            className={`btn ${className}`}
            key={s}
            onClick={() => {
              setInput(s);
              focusOnClick();
            }}
            {...props}
          >
            {s}
          </button>
        ))}
    </>
  );
};
export default Suggest;
