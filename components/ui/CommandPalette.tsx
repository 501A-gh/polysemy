import {
  ArrowLeftIcon,
  ChevronDownIcon,
  CubeIcon,
  GearIcon,
  MixIcon,
  Pencil1Icon,
  RocketIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import RadixDialog from "./RadixDialog";
import FocusTrap from "focus-trap-react";
import { useState } from "react";

interface CommandPaletteProps {
  open: boolean;
  setOpen: (state: boolean) => void;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ open, setOpen }) => {
  const router = useRouter();

  const [focus, setFocus] = useState(false);

  return (
    <>
      {open ? (
        <FocusTrap>
          {/* // bg-zinc-50/70 dark:bg-zinc-950/70 */}
          <div
            className={`
              outline-none h-fit w-96 pb-2 overflow-y-scroll 
              fixed top-0 left-1/2 -ml-48 mt-2
              transition-all duration-300 z-10
              group rounded-md cursor-pointer backdrop-blur 
               material-gradient
              border border-zinc-300 dark:border-zinc-800
              animate-slide-from-above
              shadow-lg shadow-zinc-200/50 dark:shadow-zinc-900/50
            `}
          >
            <div className={`grid gap-2`}>
              <div
                className={`
                  border-b border-b-zinc-300  dark:border-b-zinc-800
                  bg-zinc-50/70 dark:bg-zinc-950/70 backdrop-blur-md
                  flex items-center z-20
                `}
              >
                <input
                  autoFocus
                  placeholder={`Search Command`}
                  className={`
                    text-center m-0 outline-none font-mono text-xs 
                    h-fit w-full border-none p-2 rounded-sm bg-transparent
                  `}
                />
              </div>
              <section className={`grid px-2`}>
                <button
                  className={`btn btn-transparent`}
                  onClick={() => {
                    setOpen(false);
                    setFocus(false);
                  }}
                >
                  <Pencil1Icon />
                  Back to editing
                </button>
                <RadixDialog
                  title={"Import Markdown File"}
                  trigger={
                    <button
                      className={`btn btn-transparent`}
                      // onClick={() => setOpen(false)}
                    >
                      <CubeIcon />
                      Import Markdown File
                    </button>
                  }
                  description={`Edit pre-exisiting markdown files in polysemy.`}
                  save={
                    <>
                      <button className={`btn btn-transparent`}>
                        Upload Markdown File
                      </button>
                      <button className={`btn btn-standard`}>Add File</button>
                    </>
                  }
                />
                <button className={`btn btn-transparent`}>
                  <RocketIcon />
                  Export File
                </button>
                <button className={`btn btn-transparent`}>
                  <TrashIcon />
                  Delete Current File
                </button>
                <button className={`btn btn-transparent`}>
                  <GearIcon />
                  Open Settings
                </button>
                <button
                  className={`btn btn-transparent`}
                  onClick={() => router.push("/design")}
                >
                  <MixIcon />
                  About Design
                </button>
                <button
                  className={`btn btn-transparent`}
                  onClick={() => router.push("/")}
                >
                  <ArrowLeftIcon />
                  Back to Main
                </button>
              </section>
            </div>
          </div>
        </FocusTrap>
      ) : (
        <div className={`fixed top-0 w-full mx-auto left-1/2 p-1   z-40`}>
          <button
            className={`
              outline-none h-1 w-20 
              -ml-10
              transition-all duration-300
              group rounded-sm cursor-pointer 
              bg-zinc-300 dark:bg-zinc-800

              focus:bg-gradient-to-b
              from-zinc-200 to-zinc-100
              dark:from-zinc-900 dark:to-zinc-800
              flex items-center justify-center
              border
              border-zinc-300
              dark:border-zinc-800
              focus:bg-zinc-200/40 
              focus:dark:bg-zinc-950/50
              focus:h-10 
              focus:w-64
              focus:-ml-32
              focus:backdrop-blur 
              focus:shadow-xl
              focus:shadow-zinc-300
              focus:dark:shadow-zinc-900/50
              focus:rounded-full
            `}
            onClick={() => setOpen(true)}
            onFocus={() => setTimeout(() => setFocus(true), 200)}
            onBlur={() => setFocus(false)}
          >
            {focus && (
              <div
                className={`
                  text-zinc-800 dark:text-white animate-show
                `}
              >
                <div className={`flex items-center justify-center gap-2 `}>
                  <ChevronDownIcon />
                  <span className={`text-xs`}>Open Command Palette</span>
                </div>
              </div>
            )}
          </button>
        </div>
      )}
    </>
  );
};

export default CommandPalette;
