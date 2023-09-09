"use client";

import RadixPopover from "@/components/ui/RadixPopover";
import { FileTextIcon, PlusIcon } from "@radix-ui/react-icons";
import { useState } from "react";

const Header = ({ children }: { children?: JSX.Element | JSX.Element[] }) => {
  const [title, setTitle] = useState<string>("Untitled");

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
          <button className={`btn-plus ml-1`}>
            <PlusIcon />
          </button>
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
