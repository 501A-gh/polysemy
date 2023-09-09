import { type EnrichedTweet } from "react-tweet";
import { CheckIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { BlurImage } from "./BlurImage";

export const TweetHeader: React.FC<{ tweet: EnrichedTweet }> = ({ tweet }) => {
  const user = tweet?.user;
  return (
    <div className="flex items-center justify-between">
      <Link
        href={user?.url}
        target="_blank"
        rel="noreferrer"
        className={`outline-none p-1 rounded-lg flex items-center gap-2 pr-3`}
      >
        <BlurImage
          alt={user?.screen_name}
          height={48}
          width={48}
          src={user?.profile_image_url_https}
          className="h-10 w-10 overflow-hidden rounded-full focus:rounded-full border border-transparent transition-all ease-in-out hover:scale-105 hover:border-gray-200 hover:shadow-md"
        />
        <div>
          {/* href={`${user?.url}`}
          target="_blank"
          rel="noreferrer" */}
          <h4
            className={`flex items-center font-semibold text-gray-900 dark:text-gray-100 my-0`}
          >
            {/* {truncate(tweet.user.name, 20)} */}
            {user?.name}
            {user?.verified || user?.is_blue_verified ? (
              <CheckIcon
                aria-label="Verified Account"
                className={`ml-1 inline h-4 w-4 fill-blue-500`}
                viewBox="0 0 24 24"
              />
            ) : null}
          </h4>
          <p className={`text-sm text-gray-500`}>
            @{user?.screen_name} :{" "}
            {new Date(tweet?.created_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
      </Link>
      <div
        className={`
          p-2 rounded-full border 
          border-gray-200 
          dark:border-gray-800 
          bg-gradient-to-t 
          to-gray-100 
          from-gray-200
          dark:to-gray-900 
          dark:from-gray-800
        `}
      >
        <TwitterLogoIcon className={`h-5 w-5 text-[#3BA9EE]`} />
      </div>
    </div>
  );
};
