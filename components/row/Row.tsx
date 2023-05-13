import React, { useEffect, useRef, useState } from "react";
import Caret from "../Caret";
import Block from "../Block";
import { DisplayRow, displayRowStyle } from "./DisplayRow";
import { EditModeRow } from "./EditModeRow";
import { VariantProps } from "class-variance-authority";
import Tag from "../Tag";
import { Button } from "../Button";

interface RowProps {
  index: number;
  text: string[];
  paragraph: any;
  setParagraph: any;
}

export default function Row(props: RowProps) {
  const [position, setPosition] =
    useState<VariantProps<typeof displayRowStyle>["position"]>();
  const [bold, setBold] =
    useState<VariantProps<typeof displayRowStyle>["bold"]>();
  const [italic, setItalic] =
    useState<VariantProps<typeof displayRowStyle>["italic"]>();
  const [intent, setIntent] =
    useState<VariantProps<typeof displayRowStyle>["intent"]>("p");

  const [selectMode, setSelectMode] = useState<boolean>(true);
  const [text, setText] = useState<string[]>(props.text);
  const inputRef = useRef<HTMLInputElement>(null);

  const [commandMode, setCommandMode] = useState<boolean>(false);

  useEffect(() => {
    const down = (e: any) => {
      if (e.key === "Enter" && e.metaKey) setSelectMode(true);
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const [highlightPoint, setHighlightPoint] = useState([]);

  const intents: VariantProps<typeof displayRowStyle>["intent"][] = [
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "p",
  ];

  return (
    <>
      {selectMode ? (
        <section
          className={`
            flex items-center
            select-none
            py-1 print:p-0
          `}
        >
          <button
            autoFocus
            onClick={() => setSelectMode(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.metaKey) {
                props.setParagraph([...props.paragraph, []]);
              }
              if (e.key === "Backspace" || e.key === "Delete") {
                if (
                  confirm("Are you sure you want to delete this paragraph?")
                ) {
                  alert(props.index);
                  props.setParagraph((oldValues: [string[]]) =>
                    oldValues.filter((_: any, i: number) => i !== props.index)
                  );
                }
              }
              if (e.key === "b") {
                setBold(bold ? false : true);
              }
              if (e.key === "i") {
                setItalic(italic ? false : true);
              }
              if (e.key === "e") {
                setPosition("center");
              }
              if (e.key === "w") {
                setPosition("left");
              }
              if (e.key === "r") {
                setPosition("right");
              }

              if (e.key === "o") {
                setCommandMode(commandMode ? false : true);
              }
            }}
            className={`
              ml-1
              mr-2
              py-0.5
              px-2
              focus:outline-none
              font-mono max-h-full min-h-20 rounded-sm
              print:hidden text-sm
              text-gray-400
              dark:text-gray-600
              focus:bg-gradient-to-b 
              from-orange-400 dark:from-orange-500
              to-red-400 dark:to-red-500
              focus:text-white
              dark:focus:text-black
            `}
          >
            {props.index + 1}
          </button>
          <div
            className={`
              flex items-center
              flex-grow
            `}
          >
            {commandMode ? (
              <>
                {intents.map((i) => (
                  <Button
                    className={`uppercase`}
                    onClick={() => {
                      setIntent(i);
                      setCommandMode(false);
                      setSelectMode(false);
                    }}
                  >
                    {i}
                  </Button>
                ))}
              </>
            ) : (
              <DisplayRow
                position={position}
                bold={bold}
                italic={italic}
                intent={intent}
              >
                {text.join(" ")}
              </DisplayRow>
            )}
          </div>
          {text.length > 0 && (
            <span
              className={`
                font-mono text-xs text-orange-600 ml-auto mr-3
                whitespace-nowrap print:hidden
              `}
            >
              {text.length}
            </span>
          )}
        </section>
      ) : (
        <EditModeRow>
          <div
            className={`
              mr-2
              flex gap-1 items-center
            `}
          >
            <Tag>{intent}</Tag>
            {bold && <Tag>Bold</Tag>}
            {italic && <Tag>Italic</Tag>}
          </div>
          {text.length > 0 &&
            text.map((word: string, i: number) => (
              <Block
                key={i}
                index={i}
                word={word}
                text={text}
                setText={setText}
                highlightPoint={highlightPoint}
                setHighlightPoint={setHighlightPoint}
                paragraph={props.paragraph}
                setParagraph={props.setParagraph}
              />
            ))}
          <Caret
            ref={inputRef}
            text={text}
            setText={setText}
            paragraph={props.paragraph}
            setParagraph={props.setParagraph}
            intent={intent}
          />
        </EditModeRow>
      )}
    </>
  );
}
