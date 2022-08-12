import { TQuoteDifficulty, quotesDifficultyValues } from "../../types";
import { AbstractTypingSetting } from "./AbstractTypingSetting";
import { TypingContext } from "../../contexts/TypingContext";
import React, { useContext } from "react";

export const QuotesDifficulty = () => {
  const { quotesDifficulty, setQuotesDifficulty } = useContext(TypingContext);

  return (
    <AbstractTypingSetting
      values={quotesDifficultyValues}
      value={quotesDifficulty}
      setValue={(value) => setQuotesDifficulty(value as TQuoteDifficulty)}
    />
  );
};
