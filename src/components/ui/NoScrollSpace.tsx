"use client";
import { useEffect } from "react";

const NoSpaceScroll = () => {
  const handleKeyPress = (event: any) => {
    const isInputElement = ["INPUT", "TEXTAREA"].includes(event.target.tagName);
    if (!isInputElement && event.keyCode === 32) {
      event.preventDefault();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return null;
};

export default NoSpaceScroll;
