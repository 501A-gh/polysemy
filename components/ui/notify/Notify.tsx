import {
  CopyIcon,
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
        material-solid
        p-3 rounded-md w-[356px]
        shadow-2xl cursor-pointer
        flex items-center gap-2
      `}
    >
      <div className={`zinc-text`}>
        {intent === "copy" && <CopyIcon />}
        {intent === "backspace" && <TrashIcon />}
        {intent === "action" && <LightningBoltIcon />}
        {intent === "alert" && <ExclamationTriangleIcon />}
      </div>
      <p className={`zinc-text text-sm`}>{description}</p>
      {/* {type === "action" && (
        <div className={`flex items-center justify-end `}>
          <button className="btn btn-standard">Commit</button>
          <button className="btn btn-standard">Commit</button>
        </div>
      )} */}
      {/* <button onClick={() => toast.dismiss(t)} className="btn-close">
        <Cross1Icon />
      </button> */}
    </div>
  ));
