import { TypingContext } from "../../contexts/TypingContext";
import { wordsCountValues } from "../../types";
import React, { useContext } from "react";
import s from "./styles.module.scss";

export const WordsCount = () => {
  const { wordsCount, setWordsCount } = useContext(TypingContext);

  const wordsCountNodes = () => {
    return wordsCountValues.map((count, index) => (
      <p
        key={index}
        className={
          wordsCount === count
            ? s["typing-settings__param-value--active"]
            : s["typing-settings__param-value"]
        }
        onClick={() => setWordsCount(count)}
      >
        {count}
      </p>
    ));
  };

  return (
    <div className={s["typing-settings__params"]}>{wordsCountNodes()}</div>
  );
};
