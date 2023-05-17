import { VariantProps, cva } from "class-variance-authority";

const tab = cva("button", {
  variants: {
    focus: {
      true: [
        "border-r-orange-500",
        "text-white",
        "dark:text-black",

        `bg-gradient-to-r 
        from-orange-500 dark:from-orange-500
        to-red-400 dark:to-red-500`,
      ],
      false: [
        "text-gray-500",
        "dark:text-gray-500",
        "border-r-gray-300",
        "dark:border-r-gray-800",
        "focus:bg-gray-300",
        "focus:dark:bg-gray-800",
      ],
    },
  },
  defaultVariants: {
    focus: false,
  },
});

export interface TabProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof tab> {
  icon?: JSX.Element;
}

export const Tab: React.FC<TabProps> = ({
  className,
  focus,
  icon,
  ...props
}) => (
  <button
    autoFocus={focus == true ? true : false}
    className={
      tab({ focus, className }) +
      ` 
        border-r
        outline-none
        cursor-pointer
        select-none
      
        font-mono
        text-sm
        py-1
        px-3
        flex
        items-center
        gap-1.5
        whitespace-nowrap
        bg-gray-200
        dark:bg-gray-900
      `
    }
    {...props}
  >
    {icon}
    {props.children}
  </button>
);
