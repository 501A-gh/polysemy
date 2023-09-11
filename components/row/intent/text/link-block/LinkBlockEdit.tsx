import React, { useState } from "react";

const LinkBlockEdit = () => {
  const [input, setInput] = useState<string>("");
  const [url, setUrl] = useState<string>("");

  return (
    <>
      <input
        autoFocus
        placeholder="Text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          switch (e.key) {
            case " ":
              addItemToEndInGroup(input);
              createGroupBlockModeAtIndex(groupBlockMode.length);
              setTimeout(() => setInput(""), 1);
              break;
            case "Enter":
              editAndSave();
              break;
          }
        }}
      />
      <input
        autoFocus
        placeholder="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        onKeyDown={(e) => {
          switch (e.key) {
            case "Enter":
              editAndSave();
              break;
          }
        }}
      />
      <button className={`btn btn-standard`} onClick={() => editAndSave()}>
        Done
      </button>
    </>
  );
};

export default LinkBlockEdit;
