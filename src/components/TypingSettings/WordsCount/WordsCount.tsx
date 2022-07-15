import { TypingContext } from "../../../contexts/TypingContext";
import React, { useContext } from "react";
import s from "./styles.module.scss";

export const WordsCount = () => {
  const { wordsCount, setWordsCount } = useContext(TypingContext);

  const renderWordsCountStates = () => {
    const values = [15, 35, 50];

    return values.map((count, index) => (
      <p
        key={index}
        className={
          wordsCount === count
            ? s["words-count__value--active"]
            : s["words-count__value"]
        }
        onClick={() => setWordsCount(count)}
      >
        {count}
      </p>
    ));
  };

  return (
    <div className={s["words-count"]}>
      <h6>Words number: </h6>
      {renderWordsCountStates()}
    </div>
  );
};
