import React, { useState } from "react";

export type HighlightActionItemTypes = {
  action: string;
  element: JSX.Element;
};

const HighlightAction: React.FC<{
  highlightActionItems: HighlightActionItemTypes[];
}> = ({ highlightActionItems }) => {
  const [searchAction, setSearchAction] = useState<string>("");

  const [actions, setActions] =
    useState<HighlightActionItemTypes[]>(highlightActionItems);

  const filterAction = (query: string): HighlightActionItemTypes[] =>
    highlightActionItems.filter((c: HighlightActionItemTypes) => {
      if (query === "") return highlightActionItems;
      return c.action.toLowerCase().includes(query.toLowerCase());
    });

  return (
    <>
      <input
        autoFocus
        placeholder={"Search Action"}
        value={searchAction}
        onChange={(e) => {
          setSearchAction(e.target.value);
          const results = filterAction(e.target.value);
          setActions(results);
        }}
      />
      {actions.length ? (
        actions.map((c: HighlightActionItemTypes) => c.element)
      ) : (
        <p
          className={`
            px-3 py-1 text-xs animate-pulse rounded-sm 
            border border-dashed 
            border-zinc-300 dark:border-zinc-700
          `}
        >
          No Actions Found
        </p>
      )}
    </>
  );
};

export default HighlightAction;
