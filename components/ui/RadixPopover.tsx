import React from "react";
import * as Popover from "@radix-ui/react-popover";
import { Cross2Icon } from "@radix-ui/react-icons";

interface PopoverProps {
  trigger: JSX.Element;
  title: string;
  size: "small" | "medium" | "large";
  children: JSX.Element | JSX.Element[];
}

const RadixPopover: React.FC<PopoverProps> = ({
  trigger,
  title,
  size,
  children,
}) => (
  <Popover.Root>
    <Popover.Trigger asChild>{trigger}</Popover.Trigger>
    <Popover.Portal>
      {/* w-[260px] */}

      <Popover.Content
        className={`
          rounded mx-2 shadow-md material-gradient
          cursor-pointer
          will-change-[transform,opacity] 
          data-[state=open]:data-[side=top]:animate-show 
          data-[state=open]:data-[side=right]:animate-show 
          data-[state=open]:data-[side=bottom]:animate-show
          data-[state=open]:data-[side=left]:animate-show
          ${size === "small" && " w-48"}
          ${size === "medium" && "w-60"}
          ${size === "large" && "w-96"}
        `}
        sideOffset={5}
      >
        <hgroup
          className={`pt-2 pl-2 pb-1 pr-0.5 flex items-center justify-between`}
        >
          {size === "small" && (
            <h5 className={`font-serif m-0 p-0`}>{title}</h5>
          )}
          {size === "medium" && (
            <h4 className={`font-serif m-0 p-0`}>{title}</h4>
          )}
          {size === "large" && (
            <h3 className={`font-serif m-0 p-0`}>{title}</h3>
          )}
          <Popover.Close className={`btn-close`} aria-label="Close">
            <Cross2Icon />
          </Popover.Close>
        </hgroup>
        <div className={`grid p-1`}>{children}</div>
        <Popover.Arrow className={`fill-gray-300 dark:fill-gray-800`} />
      </Popover.Content>
    </Popover.Portal>
  </Popover.Root>
);

export default RadixPopover;
