import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: MainPage });

function MainPage() {
  return (
    <>
      <div className={`h-screen flex items-center justify-center flex-col text-center`}>
        <div className={`flex items-center gap-4`}>
          <img
            src="/polysemy-simplified-logo.svg"
            alt="Polysemy Logo"
            className="dark:invert"
            width={25}
            height={25}
          />
          <h1>Polysemy.</h1>
        </div>
        <h5>
          A <i>different</i> kind of text editor.
        </h5>
        <p className={`my-5 max-w-md`}>
          The text editing experience can be better. Polysemy is a different kind of text interface, and is specifically designed and built around the editing and fine-tuning of your text. Learn more about its design approach <Link to="/design">here.</Link>
        </p>
        <Link className={`btn btn-standard`} to="/$slug" params={{ slug: "test" }}>
          Try it now.
          <ArrowRightIcon />
        </Link>
      </div>
    </>
  );
}
