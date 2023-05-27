import React, { useState } from "react";
import {
  MagicWandIcon,
  Pencil1Icon,
  TransformIcon,
} from "@radix-ui/react-icons";

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

interface CommandProps {
  setCurrentMode: any;
  word: string;
  // stack: any;
  // setStack: any;
  insert: any;
  backspace: any;
  blockIndex: number;
  focusOnClick: any;
}

const Command: React.FC<CommandProps> = ({
  setCurrentMode,
  // stack,
  // setStack,
  word,
  insert,
  backspace,
  blockIndex,
  focusOnClick,
}) => {
  const [response, setResponse] = useState([]);

  const closeCommandMode = () => {
    setResponse([]);
    setCurrentMode("standard");
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
    <>
      {response.length > 0 ? (
        <>
          {response.slice(0, 50).map((obj: any, i: number) => (
            <button
              key={i}
              className={`btn btn-word`}
              onClick={() => {
                backspace(blockIndex);
                obj.word
                  .split(/\W+/)
                  .reverse()
                  .map((w: string) => {
                    insert(w);
                  });
                closeCommandMode();
                focusOnClick();
              }}
              onKeyDown={(e) => {
                if (e.key === "o") {
                  closeCommandMode();
                  focusOnClick();
                }
              }}
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
              className={`btn btn-command`}
              onClick={() => {
                fetchApi(obj.apiRoute);
              }}
              onKeyDown={(e) => {
                if (e.key === "o") {
                  closeCommandMode();
                  focusOnClick();
                }
              }}
            >
              {obj.icon}
              {obj.name}
            </button>
          ))}
        </>
      )}
    </>
  );
};

export default Command;
