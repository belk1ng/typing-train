import React, { useState, useMemo, useContext, useRef, useEffect } from "react";
import { SettingsContext } from "../../contexts/SettingsContext";
import { TypingContext } from "../../contexts/TypingContext";
import { ActiveWord, InactiveWord } from "../Word/Word";
import { useScroll } from "../../hooks/useScroll";
import s from "./styles.module.scss";

export const WordsList = () => {
  const { words, activeWord } = useContext(TypingContext);

  const { fontSize } = useContext(SettingsContext);

  const wordsContainerRef = useRef<HTMLDivElement>(null);
  const activeWordRef = useRef<HTMLParagraphElement>(null);

  useScroll(wordsContainerRef, activeWordRef);

  const wordsToType = useMemo(() => {
    return words.map((word, index) =>
      index === activeWord ? (
        <ActiveWord
          ref={activeWordRef}
          displayName={word.displayName}
          letterStatuses={word.letterStatuses}
          overflow={word.overflow}
          key={`${word.displayName}_${index}`}
        />
      ) : (
        <InactiveWord
          displayName={word.displayName}
          letterStatuses={word.letterStatuses}
          overflow={word.overflow}
          key={`${word.displayName}_${index}`}
        />
      )
    );
  }, [words, activeWord]);

  return (
    <div
      className={s["words-list"]}
      ref={wordsContainerRef}
      style={{ fontSize: fontSize }}
    >
      {wordsToType}
    </div>
  );
};
