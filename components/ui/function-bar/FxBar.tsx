import React from "react";

interface FxBarProps {
  show: boolean;
  children: React.ReactNode;
}

const FxBar: React.FC<FxBarProps> = ({ show, children }) => {
  if (!show) return null;

  return (
    <footer className={` fixed bottom-0 w-full flex justify-center p-2.5 z-40`}>
      <div
        className={`
          -translate-y-2
          material-gradient gap-[1px]
          absolute bottom-0 transition-all
          animate-show h-fit w-fit
          py-0.5 px-1 rounded-md 
          flex flex-row shadow-2xl
        `}
      >
        {children}
      </div>
    </footer>
  );
};

export default FxBar;
