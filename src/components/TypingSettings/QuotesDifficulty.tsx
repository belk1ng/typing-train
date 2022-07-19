import { TypingContext, QuoteDifficulty } from "../../contexts/TypingContext";
import React, { useContext } from "react";
import s from "./styles.module.scss";

export const QuotesDifficulty = () => {
  const { quotesDifficulty, setQuotesDifficulty } = useContext(TypingContext);

  const renderDifficultyLevels = () => {
    const values: QuoteDifficulty[] = ["easy", "middle", "hard", "random"];

    return values.map((level, index) => (
      <p
        key={index}
        className={
          quotesDifficulty.includes(level)
            ? s["typing-settings__param-value--active"]
            : s["typing-settings__param-value"]
        }
        onClick={() => setQuotesDifficulty(level)}
      >
        {level}
      </p>
    ));
  };

  return (
    <div className={s["typing-settings__params"]}>
      {renderDifficultyLevels()}
    </div>
  );
};
