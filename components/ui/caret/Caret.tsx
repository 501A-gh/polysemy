import React, { useState } from "react";
import { GroupBlockDictType } from "@/util/data/groupBlockDict";
import {
  BlockIntentType,
  getGroupBlockIntentData,
} from "@/util/helper/blockUtilities";
import PrimitiveCaret from "./PrimitiveCaret";
import GroupCaret from "./GroupCaret";

interface CaretProps {
  inputRef: React.Ref<HTMLInputElement>;
  focusOnCaret: () => void;
  insert: (text: string) => void;
  createBlockMode: () => void;
}

const Caret: React.FC<CaretProps> = ({
  inputRef,
  focusOnCaret,
  insert,
  createBlockMode,
}) => {
  const [blockIntent, setBlockIntent] = useState<BlockIntentType>();
  const [groupBlockIntent, setGroupBlockIntent] =
    useState<GroupBlockDictType>();

  return (
    <>
      {blockIntent === "group" ? (
        <GroupCaret
          setBlockIntent={setBlockIntent}
          groupBlockIntent={groupBlockIntent}
          insertGroupBlock={insert}
        />
      ) : (
        <PrimitiveCaret
          inputRef={inputRef}
          focusOnCaret={focusOnCaret}
          insert={insert}
          createBlockMode={createBlockMode}
          setBlockIntent={setBlockIntent}
          setGroupBlockIntent={(symbol: string) =>
            setGroupBlockIntent(getGroupBlockIntentData(symbol))
          }
        />
      )}
    </>
  );
};

export default Caret;
