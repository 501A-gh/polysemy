import {
  Cross1Icon,
  ExclamationTriangleIcon,
  LightningBoltIcon,
} from "@radix-ui/react-icons";
import React from "react";
import { toast } from "sonner";

export const notify = (description: string) =>
  toast.custom((t) => (
    <div
      className={`
        bg-gray-100 dark:bg-gray-900
        p-4 rounded-md w-[356px]
        border border-gray-300 dark:border-gray-800 
        shadow-2xl cursor-pointer grid gap-2
      `}
    >
      <p className={`gray-text`}>{description}</p>
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
