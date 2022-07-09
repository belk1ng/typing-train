import { WordsCountStyled, WordCountValue } from "../styles/WordsCount.styled";
import { TypingContext } from "../../contexts/TypingContext";
import React, { useContext } from "react";

export const WordsCount = () => {
  const { wordsCount, setWordsCount } = useContext(TypingContext);

  return (
    <WordsCountStyled>
      <h6>Words number: </h6>
      <WordCountValue
        active={wordsCount === 15}
        onClick={() => setWordsCount(15)}
      >
        15
      </WordCountValue>
      <WordCountValue
        active={wordsCount === 35}
        onClick={() => setWordsCount(35)}
      >
        35
      </WordCountValue>
      <WordCountValue
        active={wordsCount === 50}
        onClick={() => setWordsCount(50)}
      >
        50
      </WordCountValue>
    </WordsCountStyled>
  );
};
