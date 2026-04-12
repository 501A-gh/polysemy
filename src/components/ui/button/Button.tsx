// import { VariantProps, cva } from "class-variance-authority";
// import React from "react";

// const buttonStyle = cva(
//   [
//     "border",
//     "text-sm",
//     "outline-none",
//     "cursor-pointer",
//     "select-none",
//     "font-sans",
//     "rounded-sm",
//     "whitespace-nowrap",
//     "py-1",
//     "px-2",
//     "my-0.5",
//     "mx-[1px]",
//     "flex",
//     "items-center",
//     "gap-2",
//     "bg-zinc-200",
//     "border-zinc-200",
//     "dark:bg-zinc-800",
//     "dark:border-zinc-800",
//   ],
//   {
//     variants: {
//       intent: {
//         standard: [
//           "text-zinc-500",
//           "focus:shadow-zinc-400/40",
//           "focus:text-zinc-900",
//           "dark:focus:text-zinc-100",
//           "focus:bg-zinc-100",
//           "focus:border-zinc-300",
//           "focus:dark:bg-zinc-800",
//           "focus:dark:border-zinc-700",
//         ],
//         word: [
//           "text-zinc-500",
//           "focus:text-white",
//           "focus:border-blue-500 ",
//           "focus:dark:border-blue-700",
//           "focus:bg-blue-500 ",
//           "focus:dark:bg-blue-800",
//         ],
//         command: [
//           "text-purple-500",
//           "focus:shadow-purple-400/40",
//           "focus:text-white",
//           "dark:focus:text-black",
//           "focus:bg-purple-500",
//           "focus:border-purple-500",
//           "dark:focus:border-purple-500",
//         ],
//       },
//     },
//   }
// );

// interface ButtonProps
//   extends React.ButtonHTMLAttributes<typeof HTMLButtonElement>,
//   VariantProps<typeof buttonStyle> { }

// const Button: React.FC<ButtonProps> = ({ intent, children, ...props }) => {
//   return (
//     <button className={buttonStyle({ intent: intent })} {...props}>
//       {children}
//     </button>
//   );
// };

// export default Button;
