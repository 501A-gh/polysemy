import React from "react";
import * as Popover from "@radix-ui/react-popover";
import { Cross2Icon } from "@radix-ui/react-icons";

interface PopoverProps {
  trigger: JSX.Element;
  title: string;
  children: JSX.Element | JSX.Element[];
}

const RadixPopover: React.FC<PopoverProps> = ({ trigger, title, children }) => (
  <Popover.Root>
    <Popover.Trigger asChild>{trigger}</Popover.Trigger>
    <Popover.Portal>
      <Popover.Content
        className={`
          rounded p-5 w-[260px] mx-2 shadow-md
          bg-gray-50/50 dark:bg-gray-950/70
          border border-gray-300/70 dark:border-gray-800 backdrop-blur-lg
          will-change-[transform,opacity] 
          data-[state=open]:data-[side=top]:animate-show 
          data-[state=open]:data-[side=right]:animate-show 
          data-[state=open]:data-[side=bottom]:animate-show
          data-[state=open]:data-[side=left]:animate-show
        `}
        sideOffset={5}
      >
        <h4 className={`font-serif mt-0`}>{title}</h4>
        <div className="grid">{children}</div>
        <Popover.Close className={`btn-close`} aria-label="Close">
          <Cross2Icon />
        </Popover.Close>
        <Popover.Arrow className={`fill-gray-300 dark:fill-gray-800`} />
      </Popover.Content>
    </Popover.Portal>
  </Popover.Root>
);

export default RadixPopover;
