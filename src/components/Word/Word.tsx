import React, { forwardRef, memo, useContext } from "react";
import { WordTypeWithLetterStatuses } from "../../types";
import { LetterStatus } from "../../types";
import { Letter } from "../Letter/Letter";
import { TypingContext } from "../../contexts/TypingContext";
import s from "./styles.module.scss";

const renderWordByLetters = (
  fullWord: string,
  letterStatuses: LetterStatus[],
  overflow: string | undefined
): JSX.Element[] => {
  const currentWordLetters = fullWord
    .split("")
    .map((letter, index) => (
      <Letter
        letter={letter}
        status={letterStatuses[index] as LetterStatus}
        key={`${letter}_${index}`}
      />
    ));

  if (overflow) {
    return [
      ...currentWordLetters,
      ...overflow
        .split("")
        .map((letter, index) => (
          <Letter
            letter={letter}
            status="overflow"
            key={`${letter}_${index}`}
          />
        )),
    ];
  } else {
    return currentWordLetters;
  }
};

export const InactiveWord = memo(
  ({ displayName, letterStatuses, overflow }: WordTypeWithLetterStatuses) => {
    return (
      <div className={s.word}>
        {renderWordByLetters(displayName, letterStatuses, overflow)}
      </div>
    );
  }
);

InactiveWord.displayName = "InactiveWord";

export const ActiveWord = forwardRef<
  HTMLParagraphElement,
  WordTypeWithLetterStatuses
>(({ displayName, letterStatuses, overflow }, ref) => {
  const { activeLetter } = useContext(TypingContext);

  return (
    <div className={s.word} ref={ref}>
      <div
        className={
          activeLetter !== 0 ? s.word__cursor : s["word__cursor--animated"]
        }
        style={{ left: `calc(${activeLetter}ch + ${activeLetter}px)` }}
      ></div>
      {renderWordByLetters(displayName, letterStatuses, overflow)}
    </div>
  );
});

ActiveWord.displayName = "ActiveWord";
