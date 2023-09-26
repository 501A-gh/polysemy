import { GroupBlockDictType } from "@/util/data/groupBlockDict";
import React from "react";

interface GroupBlockWrapperProps {
  groupBlockIntent: GroupBlockDictType | undefined;
  children: JSX.Element | JSX.Element[];
}
const GroupBlockWrapper: React.FC<GroupBlockWrapperProps> = ({
  groupBlockIntent,
  children,
}) => {
  return (
    <>
      <div
        className={`
          text-lg pl-1.5 pr-1 bold 
          orange-text
        `}
      >
        {groupBlockIntent?.start}
      </div>
      {children}
      <div
        className={`
          text-lg pr-1.5 pl-1 bold 
          orange-text 
        `}
      >
        {groupBlockIntent?.end}
      </div>
    </>
  );
};

export default GroupBlockWrapper;
