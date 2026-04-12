import type { MediaDetails } from "react-tweet/api";
import { type EnrichedTweet, getMediaUrl, getMp4Video } from "react-tweet";
import { BlurImage } from "./BlurImage";

export const TweetMedia: React.FC<{
  tweet: EnrichedTweet;
  media: MediaDetails;
}> = ({ tweet, media }) => {
  if (media.type == "video") {
    return (
      <video
        className={`rounded-md border border-gray-300 dark:border-gray-800 bg-black my-0 shadow-xl block`}
        loop
        width="2048px"
        height="2048px"
        autoPlay
        muted
        playsInline
      >
        <source src={getMp4Video(media).url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  }

  if (media.type == "animated_gif") {
    return (
      <BlurImage
        alt={tweet.text}
        width={2048}
        height={media.original_info.height * (2048 / media.original_info.width)}
        src={getMp4Video(media).url}
        className="rounded-md border border-gray-300 dark:border-gray-800 shadow-xl"
      />
    );
  }

  return (
    <BlurImage
      alt={tweet.text}
      width={2048}
      height={media.original_info.height * (2048 / media.original_info.width)}
      src={getMediaUrl(media, "small")}
      className="rounded-md border border-gray-300 dark:border-gray-800 shadow-xl"
    />
  );
};
