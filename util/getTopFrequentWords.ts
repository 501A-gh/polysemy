const getTopFrequentWords = (sentence: string) => {
  const wordFrequencyMap: object = {};

  // Count frequency of each word
  sentence.split(/\W+/).forEach((word: string) => {
    if (word) {
      const lowercaseWord = word.toLowerCase();
      wordFrequencyMap[lowercaseWord] =
        (wordFrequencyMap[lowercaseWord] || 0) + 1;
    }
  });

  // Sort the words by frequency in descending order
  const sortedWords = Object.entries(wordFrequencyMap).sort(
    ([, countA], [, countB]) => countB - countA
  );

  const topFrequentWords = sortedWords.slice(0, 20).map(([word]) => word);

  return topFrequentWords;
};
