import { ArrowRightIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function MainPage() {
  return (
    <>
      <div
        className={`h-screen flex items-center justify-center flex-col text-center`}
      >
        <div className={`flex items-center gap-4`}>
          <Image
            src="/polysemy-simplified-logo.svg"
            alt="Vercel Logo"
            className="dark:invert"
            width={25}
            height={25}
            priority
          />
          <h1>Polysemy.</h1>
        </div>
        <h5>
          A <i>different</i> kind of text editor.
        </h5>
        <p className={`my-5 max-w-md`}>
          The text editing experience can be better. Polysemy is a different
          kind of text interface, and is specifically designed and built around
          the editing and fine-tuning of your text. Learn more about its design
          approach <Link href={"/design"}>here.</Link>
        </p>
        <Link className={`btn btn-standard`} href={"/test"}>
          Try it now.
          <ArrowRightIcon />
        </Link>
      </div>
      <header className={`flex justify-between p-5`}>
        <div className={`flex items-center gap-3`}>
          <Image
            src="/polysemy-simplified-logo.svg"
            alt="Vercel Logo"
            className="dark:invert"
            width={25}
            height={25}
            priority
          />
          <h1 className="m-0 p-0">Polysemy</h1>
        </div>
        <Link className={`btn btn-standard`} href={"/test"}>
          Try it now.
          <ArrowRightIcon />
        </Link>
      </header>
      <main className={`p-5`}></main>
    </>
  );
}
