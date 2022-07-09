import { useState, useMemo, useContext, useRef, useEffect } from "react";
import { TypingContext } from "../../contexts/TypingContext";
import { WordsListStyled } from "../styles/WordList.styled";
import { ActiveWord, InactiveWord } from "../Word/Word";

export const WordsList = () => {
  const { words, wordsArray, activeWord, activeLetter } =
    useContext(TypingContext);

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
    // TODO: Scroll back when user returns to the prev word
    // which is higher

    if (
      activeWordRef.current &&
      wordsContainerRef.current &&
      activeWordRef.current.offsetTop >= 100 &&
      activeWordRef.current.offsetTop !== prevWordOffsetTopValue.current
    ) {
      const scrollTopValue = wordsContainerRef.current.scrollTop;

      const verticalGap = 5;
      const scrollValue = activeWordRef.current.clientHeight + verticalGap;

      prevWordOffsetTopValue.current = activeWordRef.current.offsetTop;
      setScrollTop(scrollTopValue + scrollValue);
    }
  }, [activeWordRef, activeLetter]);

  useEffect(() => {
    if (wordsContainerRef.current) {
      scrollTo(wordsContainerRef.current, "top", scrollTop);
    }
  }, [scrollTop]);

  useEffect(() => {
    if (wordsContainerRef.current) {
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
          key={`${word.displayName}_${index}`}
        />
      ) : (
        <InactiveWord
          displayName={word.displayName}
          letterStatuses={word.letterStatuses}
          key={`${word.displayName}_${index}`}
        />
      )
    );
  }, [words, activeWord]);

  return (
    <WordsListStyled ref={wordsContainerRef}>{wordsToType}</WordsListStyled>
  );
};
