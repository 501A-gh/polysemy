"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();

  return (
    <div
      className={` h-screen flex items-center justify-center flex-col text-center`}
    >
      {/* <h1 className={`font-serif`}>Polysemy.</h1> */}
      <h4 className={`font-serif`}>A different kind of text editor.</h4>

      <p className={`my-5 max-w-md text-xs`}>
        The text editing experience for programmers is great. But the input
        experience when doing anything else like taking notes or creating a
        document is just fine but not great. Polysemy is a different kind of
        text editor soley built around editing and fine-tuning your text. If
        youre interested you can learn more about our design approach{" "}
        <Link href={"/design"}>here.</Link>
      </p>
      <button className={`btn btn-standard`} onClick={() => router.push("/")}>
        Try it out.
      </button>
    </div>
  );
}

export default Page;
