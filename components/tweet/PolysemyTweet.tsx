import { TweetHeader } from "./TweetHeader";
import { TweetText } from "./TweetText";
import { TweetMedia } from "./TweetMedia";
import {
  ChatBubbleIcon,
  ExternalLinkIcon,
  HeartIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import { EnrichedTweet } from "react-tweet";

export const PolysemyTweet: React.FC<{ tweet: EnrichedTweet }> = ({
  tweet,
}) => {
  return (
    // border border-gray-300 dark:border-gray-800
    // bg-gray-50 dark:bg-gray-950
    <div className={`break-inside-avoid p-1`}>
      <div>
        {tweet.in_reply_to_status_id_str && tweet.in_reply_to_screen_name && (
          <div className="text-xs text-gray-500 dark:text-gray-200 mb-2">
            Replying to{" "}
            <Link
              className="text-[#1da1f2] no-underline"
              href={`${tweet.in_reply_to_url}`}
              target="_blank"
            >
              @{tweet.in_reply_to_screen_name}
            </Link>
          </div>
        )}
        <TweetHeader tweet={tweet} />
        <TweetText tweet={tweet} />
      </div>
      <div className="-mb-2 mt-3">
        {tweet.mediaDetails?.length ? (
          <div
            className={
              tweet.mediaDetails.length === 1 ? "" : "inline-grid grid-cols-2"
            }
          >
            {tweet.mediaDetails?.map((media: any) => (
              <div key={media.media_url_https}>
                <Link
                  href={tweet.url}
                  target="_blank"
                  className={`p-[1px] rounded-md h-fit w-fit focus:bg-orange-600 inline-block`}
                >
                  <TweetMedia tweet={tweet} media={media} />
                </Link>
              </div>
            ))}
          </div>
        ) : null}
      </div>
      <div className="flex gap-2 text-sm text-gray-500 dark:text-gray-200 my-2">
        <Link
          className={`group flex items-center gap-1 hover:text-red-600 px-2 py-1 rounded-md`}
          href={tweet.like_url}
          target="_blank"
          rel="noreferrer"
        >
          <HeartIcon className={`h-4 w-4 group-hover:fill-red-600`} />
          {tweet.favorite_count}
        </Link>
        <Link
          className={`group flex items-center gap-1 hover:text-blue-600 px-2 py-1 rounded-md`}
          href={tweet.reply_url}
          target="_blank"
          rel="noreferrer"
        >
          <ChatBubbleIcon className={`h-4 w-4 group-hover:fill-blue-600`} />
          {tweet.conversation_count}
        </Link>
      </div>
    </div>
  );
};
