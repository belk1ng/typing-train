import { TypingContext } from "../../contexts/TypingContext";
import { QuotesDifficulty } from "./QuotesDifficulty";
import React, { useContext } from "react";
import { WordsCount } from "./WordsCount";
import { TypingMode } from "./TypingMode";
import s from "./styles.module.scss";

export const TypingSettings = () => {
  const { typingMode } = useContext(TypingContext);

  return (
    <div className={s["typing-settings"]}>
      <TypingMode />
      {typingMode === "words" && <WordsCount />}
      {typingMode === "quotes" && <QuotesDifficulty />}
    </div>
  );
};
