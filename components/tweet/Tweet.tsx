import { Suspense } from "react";
import { PolysemyTweet } from "./PolysemyTweet";
import { getTweet } from "react-tweet/api";
import { TweetProps, enrichTweet } from "react-tweet";

async function getTweetViaId(id: string) {
  console.log(id);
  const res = await fetch("http://localhost:3000/api/tweet/" + id);
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}

const TweetContent = async ({ id }: { id: string }) => {
  const tweet = await getTweetViaId(id);

  return (
    <>
      {tweet ? (
        <PolysemyTweet tweet={enrichTweet(tweet.data)} />
      ) : (
        <div
          className={`
            flex h-52
            items-center justify-center flex-col
            rounded-sm p-6 text-center text-sm
            backdrop-blur-lg backdrop-filter
          `}
        >
          <h3 className={`font-serif`}>Oops</h3>
          <p className={`text-center`}>
            There was an error loading this tweet.
          </p>
        </div>
      )}
    </>
  );
};

export const Tweet = ({
  fallback = <h3 className={`font-serif`}>Loading</h3>,
  ...props
}: TweetProps) => (
  <Suspense fallback={fallback}>
    {/* @ts-ignore: Async components are valid in the app directory */}
    <TweetContent {...props} />
  </Suspense>
);
