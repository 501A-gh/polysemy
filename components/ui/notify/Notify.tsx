import {
  CopyIcon,
  Cross1Icon,
  ExclamationTriangleIcon,
  LightningBoltIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import React from "react";
import { toast } from "sonner";

export const notify = (
  description: string,
  intent: "copy" | "backspace" | "action" | "alert"
) =>
  toast.custom((t) => (
    <div
      className={`
        material-solid overflow-clip
        rounded-md w-[356px]
        shadow-2xl cursor-pointer
        flex justify-between gap-2
      `}
    >
      <div className={`flex items-center gap-2 p-3`}>
        <div className={`zinc-text`}>
          {intent === "copy" && <CopyIcon />}
          {intent === "backspace" && <TrashIcon />}
          {intent === "action" && <LightningBoltIcon />}
          {intent === "alert" && <ExclamationTriangleIcon />}
        </div>
        <p className={`zinc-text text-sm`}>{description}</p>
      </div>
      <button
        onClick={() => toast.dismiss(t)}
        className={`
          border-l
          border-l-zinc-300 
          dark:border-l-zinc-800 
          rounded-none 
          px-3 flex items-center justify-center text-sm 
          text-zinc-400 bg-zinc-300/30
          dark:text-zinc-400 dark:bg-zinc-700/30
          focus:outline-none 
          hover:bg-zinc-100
          dark:hover:bg-zinc-800
        `}
      >
        <Cross1Icon />
      </button>
    </div>
  ));
