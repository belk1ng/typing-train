import { AbstractTypingSetting } from "./AbstractTypingSetting";
import { TypingContext } from "../../contexts/TypingContext";
import { wordsCountValues, TWordsCount } from "../../types";
import React, { useContext } from "react";

export const WordsCount = () => {
  const { wordsCount, setWordsCount } = useContext(TypingContext);

  return (
    <AbstractTypingSetting
      values={wordsCountValues}
      value={wordsCount}
      setValue={(value) => setWordsCount(value as TWordsCount)}
    />
  );
};
