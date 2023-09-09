import React from "react";
import * as HoverCard from "@radix-ui/react-hover-card";

interface HoverCardProps {
  trigger: JSX.Element;
  children: JSX.Element | JSX.Element[];
}

const RadixHoverCard: React.FC<HoverCardProps> = ({ trigger, children }) => (
  <HoverCard.Root>
    <HoverCard.Trigger asChild>{trigger}</HoverCard.Trigger>
    <HoverCard.Portal>
      <HoverCard.Content
        className={`
          data-[side=bottom]:animate-slideUpAndFade 
          data-[side=right]:animate-slideLeftAndFade 
          data-[side=left]:animate-slideRightAndFade 
          data-[side=top]:animate-slideDownAndFade 
          data-[state=open]:transition-all
          w-[300px] rounded-md 
          bg-gray-50/50 dark:bg-gray-950/70
          border border-gray-300/70 dark:border-gray-800 backdrop-blur-lg
        `}
        sideOffset={5}
      >
        {children}
        <HoverCard.Arrow className={`fill-gray-300 dark:fill-gray-800`} />
      </HoverCard.Content>
    </HoverCard.Portal>
  </HoverCard.Root>
);

export default RadixHoverCard;
