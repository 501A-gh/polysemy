import React, { useState } from "react";
import RadixDialog from "../RadixDialog";
import nlp from "compromise/three";
import { CounterClockwiseClockIcon } from "@radix-ui/react-icons";

const NlpPastTense = (sentence: string) => {
  const [convertedText, setConvertedText] = useState<string>("");

  return (
    <>
      {nlp(sentence).has("#Verb") && (
        <RadixDialog
          title={"Past Tense"}
          trigger={
            <button
              className={`btn btn-selectop`}
              onClick={() => {
                const doc = nlp(sentence);
                doc.verbs().toPastTense();
                setConvertedText(doc.text());
              }}
            >
              <CounterClockwiseClockIcon />
              Past Tense
            </button>
          }
          description={`convert the following text to past tense.`}
          save={
            <button
              className={`btn btn-standard`}
              onClick={() => convertToPastTense(convertedText)}
            >
              Establish Changes
            </button>
          }
        >
          <section className={`grid grid-cols-2 gap-1`}>
            <h6 className={`mb-0 ml-1 italic`}>Original</h6>
            <h6 className={`mb-0 ml-1 italic`}>Modified</h6>
            <div
              className={`
                text-gray-400
                dark:text-gray-500
                border border-dashed 
                border-gray-300 
                dark:border-gray-700 
                text-xs p-1 rounded-sm 
                m-0.5 py-1 px-2 font-mono
              `}
            >
              {sentence}
            </div>
            <textarea
              placeholder="Converted text"
              value={convertedText}
              onChange={(e) => setConvertedText(e.target.value)}
              rows={5}
            />
          </section>
        </RadixDialog>
      )}
    </>
  );
};

export default NlpPastTense;
