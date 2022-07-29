import { useEffect, useContext, useState, useRef, RefObject } from "react";
import { TypingContext } from "../contexts/TypingContext";

type TSide = "top" | "bottom" | "left" | "right";

export const useScroll = (
  wordsContainerRef: RefObject<HTMLDivElement>,
  activeWordRef: RefObject<HTMLParagraphElement>
) => {
  const { wordsArray, activeWord } = useContext(TypingContext);

  const [scrollTop, setScrollTop] = useState<number>(0);

  const prevWordOffsetTopValue = useRef<number>(0);

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
  }, [activeWordRef, activeWord]);

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

  const scrollTo = (elem: HTMLElement, side: TSide, pixels: number): void => {
    elem.scrollTo({
      [side]: pixels,
      behavior: "smooth",
    });
  };
};
