import { Link2Icon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import RadixDialog from "../RadixDialog";

interface LinkInsertProps {
  trigger: JSX.Element;
  applyLink: (link: string) => void;
}

const LinkInsert: React.FC<LinkInsertProps> = ({ trigger, applyLink }) => {
  const [link, setLink] = useState<string>("");

  return (
    <>
      <RadixDialog
        title={"Set Link"}
        trigger={trigger}
        description={`add a link to the highlighted text.`}
        save={
          <>
            <button
              className={`btn btn-standard`}
              onClick={() => applyLink(link)}
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
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </fieldset>
      </RadixDialog>
    </>
  );
};

export default LinkInsert;
