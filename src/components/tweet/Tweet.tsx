import { type ReactNode, useEffect, useState } from "react";
import { PolysemyTweet } from "./PolysemyTweet";
import { getTweet } from "react-tweet/api";
import { enrichTweet } from "react-tweet";

interface TweetProps {
  id: string;
  fallback?: ReactNode;
}

export const Tweet = ({
  id,
  fallback = <h3 className={`font-serif`}>Loading</h3>,
}: TweetProps) => {
  const [state, setState] = useState<"loading" | "success" | "error">("loading");
  const [tweet, setTweet] = useState<ReturnType<typeof enrichTweet> | null>(null);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      setState("loading");
      try {
        const raw = await getTweet(id);
        if (!raw || cancelled) {
          if (!cancelled) setState("error");
          return;
        }

        setTweet(enrichTweet(raw));
        setState("success");
      } catch {
        if (!cancelled) {
          setState("error");
        }
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (state === "loading") {
    return fallback;
  }

  if (state === "success" && tweet) {
    return <PolysemyTweet tweet={tweet} />;
  }

  return (
    <div
      className={`
        flex h-52
        items-center justify-center flex-col
        rounded-sm p-6 text-center text-sm
        backdrop-blur-lg backdrop-filter
      `}
    >
      <h3 className={`font-serif`}>Oops</h3>
      <p className={`text-center`}>There was an error loading this tweet.</p>
    </div>
  );
};
