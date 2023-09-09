import {
  Link2Icon,
  LinkBreak2Icon,
  LinkNone2Icon,
} from "@radix-ui/react-icons";
import React, { useState } from "react";
import RadixDialog from "../RadixDialog";

interface LinkInputProps {
  applyLink: (link: string) => void;
}

const LinkInput: React.FC<LinkInputProps> = ({ applyLink }) => {
  const [showLinkInput, setShowLinkInput] = useState<boolean>(false);
  const [link, setLink] = useState<string>("");

  return (
    <>
      <RadixDialog
        title={"Set Link"}
        trigger={
          <button
            className={`btn btn-selectop`}
            onClick={() => setShowLinkInput(true)}
          >
            <LinkNone2Icon />
            Set Link
          </button>
        }
        description={`add a link to the highlighted text.`}
        save={
          <>
            {/* <button
              className={`btn btn-selectop`}
              onClick={() => {
                setShowLinkInput(false);
                setLink("");
              }}
            >
              <LinkBreak2Icon />
              Cancel
            </button> */}
            <button
              className={`btn btn-selectop`}
              onClick={() => {
                setShowLinkInput(false);
                applyLink(link);
              }}
            >
              <Link2Icon />
              Set link
            </button>
          </>
        }
      >
        <fieldset>
          <label htmlFor="inputTitle">Link URL</label>
          <input
            autoFocus
            id="inputTitle"
            type="url"
            placeholder="https://"
            className={`highlight-input`}
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </fieldset>
      </RadixDialog>
    </>
  );
};

export default LinkInput;
