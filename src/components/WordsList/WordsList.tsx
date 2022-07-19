import { useState, useMemo, useContext, useRef, useEffect } from "react";
import { SettingsContext } from "../../contexts/SettingsContext";
import { TypingContext } from "../../contexts/TypingContext";
import { ActiveWord, InactiveWord } from "../Word/Word";
import s from "./styles.module.scss";

export const WordsList = () => {
  const { words, wordsArray, activeWord, activeLetter } =
    useContext(TypingContext);

  const { fontSize } = useContext(SettingsContext);

  const activeWordRef = useRef<HTMLParagraphElement>(null);
  const prevWordOffsetTopValue = useRef<number>(0);
  const wordsContainerRef = useRef<HTMLDivElement>(null);

  const [scrollTop, setScrollTop] = useState<number>(0);

  type TSide = "top" | "bottom" | "left" | "right";

  const scrollTo = (elem: HTMLElement, side: TSide, pixels: number): void => {
    elem.scrollTo({
      [side]: pixels,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const verticalGap = 5;

    if (wordsContainerRef.current && activeWordRef.current) {
      const scrollTopValue = wordsContainerRef.current.scrollTop;
      const scrollValue = activeWordRef.current.clientHeight + verticalGap;

      if (
        activeWordRef.current.offsetTop < prevWordOffsetTopValue.current &&
        !(
          activeWordRef.current.offsetTop +
            activeWordRef.current.clientHeight * 2 +
            verticalGap ===
          wordsContainerRef.current.scrollHeight
        )
      ) {
        // Scrollback only if the active word not inside the last two rows

        setScrollTop(scrollTopValue - scrollValue);
        prevWordOffsetTopValue.current = activeWordRef.current.offsetTop;
      } else if (
        // Show next rows

        activeWordRef.current.offsetTop >=
          activeWordRef.current.clientHeight * 2 + verticalGap * 2 &&
        activeWordRef.current.offsetTop !== prevWordOffsetTopValue.current
      ) {
        prevWordOffsetTopValue.current = activeWordRef.current.offsetTop;
        setScrollTop(scrollTopValue + scrollValue);
      }
    }
  }, [activeWordRef, activeLetter]);

  useEffect(() => {
    if (wordsContainerRef.current) {
      scrollTo(wordsContainerRef.current, "top", scrollTop);
    }
  }, [scrollTop]);

  useEffect(() => {
    if (wordsContainerRef.current) {
      prevWordOffsetTopValue.current = 0;
      setScrollTop(0);
      scrollTo(wordsContainerRef.current, "top", 0);
    }
  }, [wordsArray]);

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
