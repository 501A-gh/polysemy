import React, { useEffect, useRef, useState, type JSX } from "react";
import {
  MagicWandIcon,
  Pencil1Icon,
  TransformIcon,
} from "@radix-ui/react-icons";
import type { ActionTypes } from "@/util/helper/globalUtilities";

interface CommandButtonProps {
  icon: JSX.Element;
  name: string;
  apiRoute: string;
}

const options: CommandButtonProps[] = [
  {
    icon: <Pencil1Icon />,
    name: "Synonym",
    apiRoute: "ml",
  },
  {
    icon: <TransformIcon />,
    name: "Correlated",
    apiRoute: "rel_trg",
  },
  {
    icon: <MagicWandIcon />,
    name: "Rhyme",
    apiRoute: "rel_rhy",
  },
];

const Command: React.FC<{
  word: string;
  focusOnClick: () => void;
  setAction: React.Dispatch<React.SetStateAction<ActionTypes>>;
  edit: (word: string) => void;
}> = ({ setAction, word, edit, focusOnClick }) => {
  const [response, setResponse] = useState([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const closeOperateMode = () => {
    setResponse([]);
    setAction("standard");
  };

  const getOptionButtons = () => {
    if (!containerRef.current) return [];
    return Array.from(containerRef.current.querySelectorAll("button"));
  };

  useEffect(() => {
    const buttons = getOptionButtons();
    buttons[0]?.focus();
  }, [response]);

  const handleKeyboardNavigation = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    const buttons = getOptionButtons();
    if (buttons.length === 0) return;

    if (e.key === "o" || e.key === "Escape") {
      e.preventDefault();
      e.stopPropagation();
      closeOperateMode();
      focusOnClick();
      return;
    }

    const nextIndex =
      index + 1 >= buttons.length ? 0 : index + 1;
    const previousIndex =
      index - 1 < 0 ? buttons.length - 1 : index - 1;

    if (e.key === "Tab") {
      e.preventDefault();
      e.stopPropagation();
      buttons[e.shiftKey ? previousIndex : nextIndex]?.focus();
      return;
    }

    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      e.stopPropagation();
      buttons[nextIndex]?.focus();
      return;
    }

    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      e.stopPropagation();
      buttons[previousIndex]?.focus();
      return;
    }

    if (e.key === "Home") {
      e.preventDefault();
      e.stopPropagation();
      buttons[0]?.focus();
      return;
    }

    if (e.key === "End") {
      e.preventDefault();
      e.stopPropagation();
      buttons[buttons.length - 1]?.focus();
    }
  };

  async function fetchApi(apiRoute: string) {
    const response = await fetch(
      `https://api.datamuse.com/words?${apiRoute}=${word}`
    );
    const responseJsonData = await response.json();
    console.log(responseJsonData);
    if (responseJsonData.length > 0) {
      setResponse(responseJsonData);
    } else {
      alert("None found.");
    }
  }

  return (
    <div
      ref={containerRef}
      data-operate-menu="true"
      className="inline-flex flex-wrap items-center"
    >
      {response.length > 0 ? (
        <>
          {response.slice(0, 50).map((obj: any, i: number) => (
            <button
              key={i}
              className={`btn-standard inline-flex`}
              onClick={() => {
                edit(obj.word);
                closeOperateMode();
                focusOnClick();
              }}
              onKeyDown={(e) => handleKeyboardNavigation(e, i)}
            >
              {obj.word}
            </button>
          ))}
        </>
      ) : (
        <>
          {options.map((obj: CommandButtonProps, i: number) => (
            <button
              key={i}
              className={`btn-standard inline-flex`}
              onClick={() => {
                fetchApi(obj.apiRoute);
              }}
              onKeyDown={(e) => handleKeyboardNavigation(e, i)}
            >
              {obj.icon}
              {obj.name}
            </button>
          ))}
        </>
      )}
    </div>
  );
};

export default Command;
