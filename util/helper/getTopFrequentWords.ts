export const getTopFrequentWords = (sentence: string) => {
  const words = sentence.split(/\W+/);
  const wordFrequencyMap: { [key: string]: number } = {};

  words.forEach((word) => {
    if (word) {
      const lowercaseWord = word.toLowerCase();
      wordFrequencyMap[lowercaseWord] =
        (wordFrequencyMap[lowercaseWord] || 0) + 1;
    }
  });

  const sortedWords = Object.entries(wordFrequencyMap).sort(
    ([, countA], [, countB]) => countB - countA
  );
  const topFrequentWords = sortedWords.slice(0, 20).map(([word]) => word);

  return topFrequentWords;
};
