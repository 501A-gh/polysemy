import { Cross1Icon, Cross2Icon } from "@radix-ui/react-icons";
import React, { useState, ReactNode } from "react";

interface FxBarProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const FxBar: React.FC<FxBarProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

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

interface FxBarContextProps {
  showFxBar: (content: ReactNode) => void;
  closeFxBar: () => void;
}

export const FxBarContext = React.createContext<FxBarContextProps | undefined>(
  undefined
);

export const FxBarProvider: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState<ReactNode | null>(null);

  const showFxBar = (content: ReactNode) => {
    setDialogContent(content);
    setIsOpen(true);
  };

  const closeFxBar = () => {
    setIsOpen(false);
    setDialogContent(null);
  };

  const contextValue: FxBarContextProps = {
    showFxBar,
    closeFxBar,
  };

  return (
    <FxBarContext.Provider value={contextValue}>
      {children}
      <FxBar isOpen={isOpen} onClose={closeFxBar}>
        {dialogContent}
      </FxBar>
    </FxBarContext.Provider>
  );
};

export { FxBar };
