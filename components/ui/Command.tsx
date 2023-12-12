import React, { useState } from "react";
import {
  MagicWandIcon,
  Pencil1Icon,
  TransformIcon,
} from "@radix-ui/react-icons";
import { ActionTypes } from "@/util/helper/blockUtilities";

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
  focusOnClick: any;
  setAction: React.Dispatch<React.SetStateAction<ActionTypes>>;
  edit: (word: string) => void;
}> = ({ setAction, word, edit, focusOnClick }) => {
  const [response, setResponse] = useState([]);

  const closeCommandMode = () => {
    setResponse([]);
    setAction("standard");
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
              className={`btn-standard`}
              onClick={() => {
                edit(obj.word);
                closeCommandMode();
                focusOnClick();
              }}

              // onKeyDown={(e) => {
              //   if (e.key === "o") {
              //     closeCommandMode();
              //     focusOnClick();
              //   }
              // }}
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
              className={`btn-standard`}
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
