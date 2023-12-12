import { cva } from "class-variance-authority";

export interface SuggestProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  input: string | "";
  setInput: any;
  suggestion: string[];
  focusOnClick: any;
  className: string;
}

const word = cva(
  [
    "outline-none",
    "cursor-pointer",
    "select-none",
    "text-sm",
    "font-sans",
    "rounded-sm",
    "whitespace-nowrap",
    "py-1",
    "px-2",
    "my-0.5",
    "mx-[1px]",
    "flex",
    "items-center",
    "gap-1.5",
    "border",
    "bg-zinc-200",
    "dark:bg-zinc-800",
    "border-zinc-200",
    "dark:border-zinc-800",
  ],
  {
    variants: {
      intent: {
        standard: [
          "text-blue-500",
          "focus:text-white",
          "focus:border-blue-500",
          "focus:dark:border-blue-700",
          "focus:bg-blue-500",
          "focus:dark:bg-blue-800",
        ],
      },
    },
  }
);

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
            key={i}
            className={word({ intent: "standard" })}
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
