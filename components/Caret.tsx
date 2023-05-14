import React, { useRef, useState } from "react";
import Suggest, { SuggestProps } from "./Suggest";
import { Input } from "./Input";
import words from "@/util/data/words";

export default function Caret(props: any) {
  const [focus, setFocus] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const [input, setInput] = useState<SuggestProps["input"]>("");
  const [suggestion, setSuggestion] = useState<SuggestProps["suggestion"]>([]);

  const [insert, setInsert] = useState<boolean>(false);
  const [insertInput, setInsertInput] = useState<string>("");

  return (
    <Suggest
      onFocus={setFocus}
      inputRef={inputRef}
      input={input}
      setInput={setInput}
      suggestion={suggestion}
    >
      <div
        className={`
          flex items-center gap-0.25 
          my-0.5 ml-1
        `}
      >
        <input
          autoFocus
          spellCheck
          ref={inputRef}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onPaste={(e) => {
            e.preventDefault();
            alert("To paste switch to insert mode");
          }}
          className={`
            focus:outline-none
            rounded-sm
            font-mono 
            w-20 h-fit
            text-sm
            bg-transparent
            px-0
            mr-0.5
            border
            border-transparent
            text-orange-500
            placeholder:text-orange-500`}
          placeholder={focus ? "Type ..." : ""}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            const results = words.filter((wrd: any) => {
              if (e.target.value === "") return wrd;
              return wrd.toLowerCase().includes(e.target.value.toLowerCase());
            });
            setSuggestion(results);
          }}
          onKeyDown={(e) => {
            setFocus(true);
            if (e.metaKey && e.key == "i") {
              setInsert(true);
              setFocus(false);
            }
            if (input.split("").length > 0 && e.key === " ") {
              props.setText([...props.text, input]);
              setTimeout(() => setInput(""), 1);
            }
          }}
        />
        {insert && (
          <Input
            autoFocus
            placeholder="Insert ..."
            value={insertInput}
            onChange={(e) => setInsertInput(e.target.value)}
            onBlur={() => setInsert(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                let temp: string[] = [...props.text];
                insertInput.split(/\W+/).map((word: string) => {
                  temp.push(word);
                });
                props.setText(temp);
                setInsertInput("");
                setInsert(false);
                setFocus(true);
              }
            }}
          />
        )}
      </div>
    </Suggest>
  );
}
