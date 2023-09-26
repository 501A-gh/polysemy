"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();

  return (
    <div className={`h-screen flex items-center justify-center flex-col text-center`}>
      <h1 className={`font-serif`}>Polysemy.</h1>
      <h4 className={`font-serif`}>A different kind of text editor.</h4>
      <p className={`my-5 max-w-md text-xs`}>
        The text editing experience can be better Polysemy is a different kind
        of text interface, and is specifically built around the editing and
        fine-tuning of your text. Learn more about its design approach{" "}
        <Link href={"/design"}>here.</Link>
      </p>
      <button
        className={`btn btn-standard`}
        onClick={() => router.push("/test")}
      >
        Try it out.
      </button>
    </div>
  );
}

export default Page;
