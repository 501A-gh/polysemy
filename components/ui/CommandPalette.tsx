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

interface CommandPaletteProps {
  open: boolean;
  setOpen: any;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ open, setOpen }) => {
  const router = useRouter();

  return (
    <>
      {open ? (
        <div
          className={`
            outline-none h-72 w-96 overflow-y-scroll 
            fixed top-0 left-1/2 -ml-48 mt-2
            transition-all duration-300 z-10
            group rounded-md
            cursor-pointer 
            backdrop-blur 
            bg-gray-50/70 
            dark:bg-gray-950/70
            border
            border-gray-300
            dark:border-gray-800
            animate-slide-from-above
            shadow-gray-300 dark:shadow-gray-900
            shadow-xl
          `}
        >
          <div className={`grid gap-2`}>
            <div
              className={`
                sticky top-0 
                border-b 
                border-b-gray-300 
                dark:border-b-gray-800
                bg-gray-50/70 
                dark:bg-gray-950/70
                backdrop-blur-md
                flex items-center z-20
                shadow-lg 
                shadow-gray-200/50 dark:shadow-gray-900/50
              `}
            >
              <input
                autoFocus
                placeholder={`Search Command`}
                className={`
                  m-0 outline-none font-mono text-xs h-fit w-full border-none p-2 rounded-sm bg-transparent
                `}
              />
            </div>
            <div className={`flex items-center justify-between px-2 py-0`}>
              <h6>Commands</h6>
              <div>
                <span className={`text-hint`}>Use {">"} to Search</span>
              </div>
            </div>
            <section className={`grid px-2`}>
              <button
                className={`btn btn-standard`}
                onClick={() => setOpen(false)}
              >
                <Pencil1Icon />
                Back to editing
              </button>
              <RadixDialog
                title={"Import Markdown File"}
                trigger={
                  <button
                    className={`btn btn-standard`}
                    // onClick={() => setOpen(false)}
                  >
                    <CubeIcon />
                    Import Markdown File
                  </button>
                }
                description={`Edit pre-exisiting markdown files in polysemy.`}
                save={
                  <>
                    <button className={`btn btn-standard`}>
                      Upload Markdown File
                    </button>
                    <button className={`btn btn-standard`}>Add File</button>
                  </>
                }
              />
              <button className={`btn btn-standard`}>
                <RocketIcon />
                Export File
              </button>
              <button className={`btn btn-standard`}>
                <TrashIcon />
                Delete Current File
              </button>
            </section>
            <hr />
            <div className={`flex items-center justify-between px-2 py-0`}>
              <h6>Pages</h6>
              <div>
                <span className={`text-hint`}>Use {"@"} to envoke</span>
              </div>
            </div>
            <section className={`grid px-2 pb-2`}>
              <button className={`btn btn-standard`}>
                <GearIcon />
                Open Settings
              </button>
              <button
                className={`btn btn-standard`}
                onClick={() => router.push("/design")}
              >
                <MixIcon />
                About Design
              </button>
              <button
                className={`btn btn-standard`}
                onClick={() => router.push("/")}
              >
                <ArrowLeftIcon />
                Back to Main
              </button>
            </section>
          </div>
        </div>
      ) : (
        <button
          className={`
            outline-none h-1 w-72 
            fixed top-0 left-1/2 -ml-36
            transition-all duration-300 z-20
            group rounded-b-sm
            cursor-pointer 
            bg-gray-300
            dark:bg-gray-800

            hocus:bg-gradient-to-b
            from-gray-200
            to-gray-100
            dark:from-gray-900
            dark:to-gray-800
            flex items-center justify-center
            border
            border-gray-300
            dark:border-gray-800
            hocus:bg-gray-200/40 
            hocus:dark:bg-gray-950/50
            hocus:h-10 
            hocus:w-64
            hocus:-ml-32
            hocus:backdrop-blur 
            hocus:shadow-xl
            hocus:shadow-gray-300
            hocus:dark:shadow-gray-900/50
            hocus:rounded-b-xl
            `}
          // hocus:border-gray-300
          // hocus:dark:border-gray-800
          onClick={() => setOpen(true)}
        >
          <div
            className={`
              hidden group-hover:block group-focus:block 
              text-gray-800 dark:text-white 
            `}
          >
            <div
              className={`flex items-center justify-center gap-2 animate-bounce`}
            >
              <ChevronDownIcon />
              <span className={`text-xs`}>Open Command Palette</span>
            </div>
          </div>
        </button>
      )}
    </>
  );
};

export default CommandPalette;
