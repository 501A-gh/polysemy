const twitterRegex =
  /^https?:\/\/(?:www\.)?twitter\.com\/(?:\w+)\/status(?:es)?\/(\d+)/;

export const isTweet = (url: string): boolean => {
  const match = url.match(twitterRegex);
  if (match) {
    return true;
  } else {
    return false;
  }
};

export const extractTweetIdFromUrl = (url: string) => {
  const match = url.match(twitterRegex);
  if (match && match[1]) {
    return match[1];
  }
  return null;
};
