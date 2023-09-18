"use client";
import { MagnifyingGlassIcon, PlusIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import RadixDialog from "./RadixDialog";
import { getTopFrequentWords } from "@/util/helper/getTopFrequentWords";
import { Tweet } from "../tweet/Tweet";
import RadixHoverCard from "./RadixHoverCard";
import RadixPopover from "./RadixPopover";

export default function SideBar() {
  const [token, setToken] = useState<string>("");

  const saveTokens = () => {
    console.log(getTopFrequentWords(token));
  };

  return (
    <>
      <div className={`flex justify-between h-screen flex-col`}>
        <section className={`p-1`}>
          <div className={`flex`}>
            <input className={`w-full`} placeholder="Search Query" />
            <button className={`btn btn-standard`}>
              <MagnifyingGlassIcon />
              Search
            </button>
          </div>
          <div className={`grid`}>
            <RadixDialog
              trigger={
                <button className={`btn btn-standard`}>
                  <PlusIcon />
                  Add Tokens
                </button>
              }
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
              <textarea
                rows={6}
                placeholder={`Input tokens`}
                value={token}
                onChange={(e) => setToken(e.target.value)}
              />
            </RadixDialog>
          </div>
          {/* <RadixHoverCard trigger={<h1>bruh</h1>}>
            <Tweet id={"1685560968540008448"} />
          </RadixHoverCard> */}
        </section>
        <hr />

        <section className={`p-1`}>
          <div className={`grid grid-cols-2`}>
            <button className={`btn btn-standard`}>Import MD File</button>
            <RadixPopover
              title="Export"
              size={"medium"}
              trigger={<button className={`btn btn-standard`}>Export</button>}
            >
              <div className={`grid gap-2`}>
                <div>
                  <fieldset>
                    <label htmlFor="name">Filename</label>
                    <input
                      className={`flex-1 items-center justify-center`}
                      id="name"
                      defaultValue="Untitled File"
                    />
                  </fieldset>
                  {/* <fieldset>
                      <label htmlFor="username">Username</label>
                      <input
                        className="w-full flex-1 items-center justify-center"
                        id="username"
                        defaultValue="@peduarte"
                      />
                    </fieldset> */}
                </div>
                <button className={`btn btn-standard`}>Export</button>
              </div>
            </RadixPopover>
          </div>
          <div>
            <p>
              <span className={`font-serif`}>Polysemy.</span>
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
