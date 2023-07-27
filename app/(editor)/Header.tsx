"use client";

import RadixDialog from "@/components/ui/RadixDialog";
import RadixPopover from "@/components/ui/RadixPopover";
import { getTopFrequentWords } from "@/util/helper/getTopFrequentWords";
import { FileTextIcon } from "@radix-ui/react-icons";
import { useState } from "react";

const Header = ({ children }: { children?: JSX.Element | JSX.Element[] }) => {
  const [title, setTitle] = useState<string>("Untitled");
  const [token, setToken] = useState<string>("");

  const saveTokens = () => {
    console.log(getTopFrequentWords(token));
  };

  return (
    <header
      className={`
          z-10 sticky top-0
          print:hidden select-none
          border-b border-b-gray-300
          bg-gray-100 dark:border-b-gray-800 dark:bg-gray-950
        `}
    >
      <section className={`flex items-center justify-between`}>
        <div className={`flex items-center`}>
          <RadixPopover
            title={"Details"}
            trigger={
              <button className={`btn-tab`}>
                <FileTextIcon />
                {title}
              </button>
            }
          >
            <fieldset>
              <label htmlFor="docTitle">Doc Title</label>
              <input
                id="docTitle"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </fieldset>
            {/* <fieldset>
              <label htmlFor="maxWidth">Max</label>
              <input id="maxWidth" defaultValue="300px" />
            </fieldset> */}
          </RadixPopover>
          {/* <button className={`btn-tab`}>Docs</button> */}
          <RadixDialog
            trigger={<button className={`btn-tab`}>Add Tokens</button>}
            title={"Add Tokens"}
            description={
              "[Does not work currently] - Add tokens to polysemy to have you're editor be more context aware of what you are writing about."
            }
            save={
              <button
                className={`btn btn-standard`}
                onClick={() => saveTokens()}
              >
                Save changes
              </button>
            }
          >
            {/* <fieldset>
              <label htmlFor="name">Name</label>
              <input
                className={` flex-1 items-center justify-center`}
                id="name"
                defaultValue="Pedro Duarte"
              />
            </fieldset>
            <fieldset>
              <label htmlFor="username">Username</label>
              <input
                className="w-full flex-1 items-center justify-center"
                id="username"
                defaultValue="@peduarte"
              />
            </fieldset> */}
            <textarea
              rows={6}
              placeholder={`Input tokens`}
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
          </RadixDialog>
          {/* <button className={`btn-tab`}>Import</button>
          <button className={`btn-tab`}>Export</button> */}
        </div>

        <div
          className={`
              bg-gradient-to-tr 
              from-gray-800 
              to-gray-950
              focus:outline-none
              p-1
            `}
        >
          <h1
            className={`
                text-sm mx-2 my-0
                whitespace-nowrap
                text-white font-serif
              `}
          >
            Polysemy.
          </h1>
        </div>
      </section>
      {children}
    </header>
  );
};

export default Header;
