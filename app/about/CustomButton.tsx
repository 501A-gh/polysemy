import React, { forwardRef } from "react";

interface CustomButtonProps {
  label: string;
  click: () => void;
}

const CustomButton: React.ForwardRefRenderFunction<
  HTMLButtonElement,
  CustomButtonProps
> = ({ label, click }, ref) => {
  return (
    <button ref={ref} onClick={click}>
      {label}
    </button>
  );
};

export default forwardRef(CustomButton);
