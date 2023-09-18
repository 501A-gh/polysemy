import { useContext } from "react";
import { FxBarContext } from "./FxBar";

export const useFxBar = () => {
  const context = useContext(FxBarContext);
  if (!context) {
    throw new Error("useFxBar must be used within a FxBarProvider");
  }
  return context;
};
