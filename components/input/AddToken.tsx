import React from "react";

const WordFrequencyAnalyzer = ({ sentence }: { sentence: string }) => {
  const topFrequentWords = getTopFrequentWords(sentence);

  return (
    <div>
      <h2>Top 20 Most Frequent Words:</h2>
      <ul>
        {topFrequentWords.map((word, index) => (
          <li key={index}>{word}</li>
        ))}
      </ul>
    </div>
  );
};

export default WordFrequencyAnalyzer;
