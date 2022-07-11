import React, { forwardRef, memo, useContext } from "react";
import { LetterStatus } from "../../constants";
import { Letter } from "../Letter/Letter";
import {
  WordTypeWithLetterStatuses,
  TypingContext,
} from "../../contexts/TypingContext";
import s from "./styles.module.scss";

const renderWordByLetters = (
  fullWord: string,
  letterStatuses: LetterStatus[]
): JSX.Element[] => {
  return fullWord
    .split("")
    .map((letter, index) => (
      <Letter
        letter={letter}
        status={letterStatuses[index] as LetterStatus}
        key={`${letter}_${index}`}
      />
    ));
};

export const InactiveWord = memo(
  ({ displayName, letterStatuses }: WordTypeWithLetterStatuses) => {
    return (
      <div className={s.word}>
        {renderWordByLetters(displayName, letterStatuses)}
      </div>
    );
  }
);

export const ActiveWord = forwardRef<
  HTMLParagraphElement,
  WordTypeWithLetterStatuses
>(({ displayName, letterStatuses }, ref) => {
  const { activeLetter } = useContext(TypingContext);

  return (
    <div className={s.word} ref={ref}>
      <div
        className={
          activeLetter !== 0 ? s.word__cursor : s["word__cursor--animated"]
        }
        style={{ left: `calc(${activeLetter}ch + ${activeLetter}px)` }}
      ></div>
      {renderWordByLetters(displayName, letterStatuses)}
    </div>
  );
});
