import React, { useState } from "react";

interface NestedCommandProps {
  trigger: JSX.Element;
  children: JSX.Element;
}

const NestedCommand: React.FC<NestedCommandProps> = (trigger, children) => {
  const [open, setOpen] = useState(false);
  return <>{open ? trigger : children}</>;
};

export default NestedCommand;
