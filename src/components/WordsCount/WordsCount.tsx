import { TypingContext } from "../../contexts/TypingContext";
import React, { useContext } from "react";
import s from "./styles.module.scss";

export const WordsCount = () => {
  const { wordsCount, setWordsCount } = useContext(TypingContext);

  return (
    <div className={s["words-count"]}>
      <h6>Words number: </h6>
      <p
        className={
          wordsCount === 15
            ? s["words-count__value--active"]
            : s["words-count__value"]
        }
        onClick={() => setWordsCount(15)}
      >
        15
      </p>
      <p
        className={
          wordsCount === 35
            ? s["words-count__value--active"]
            : s["words-count__value"]
        }
        onClick={() => setWordsCount(35)}
      >
        35
      </p>
      <p
        className={
          wordsCount === 50
            ? s["words-count__value--active"]
            : s["words-count__value"]
        }
        onClick={() => setWordsCount(50)}
      >
        50
      </p>
    </div>
  );
};
