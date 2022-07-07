import { useState, useMemo, useContext, useRef, useEffect } from "react";
import { WordsListStyled } from "./styles/WordList.styled";
import { TypingContext } from "../contexts/TypingContext";
import Word from "./Word";

export const WordsList = () => {
    const { words, activeWord } = useContext(TypingContext);

    const activeWordRef = useRef<HTMLParagraphElement>(null);
    const prevWordOffsetTopValue = useRef<number>(0);
    const wordsContainerRef = useRef<HTMLDivElement>(null);

    const [scrollTop, setScrollTop] = useState<number>(1);

    useEffect(() => {
        if (
            activeWordRef.current &&
            wordsContainerRef.current &&
            activeWordRef.current.offsetTop >= 100 &&
            activeWordRef.current.offsetTop !== prevWordOffsetTopValue.current
        ) {
            const scrollTopValue = wordsContainerRef.current.scrollTop;
            prevWordOffsetTopValue.current = activeWordRef.current.offsetTop;
            setScrollTop(scrollTopValue + 50);
        }
    }, [activeWordRef.current]);

    useEffect(() => {
        if (wordsContainerRef.current) {
            wordsContainerRef.current.scrollTo({
                top: scrollTop,
                behavior: "smooth",
            });
        }
    }, [scrollTop]);

    const wordsToType = useMemo(() => {
        return words.map((word, index) =>
            index === activeWord ? (
                <Word
                    ref={activeWordRef}
                    active={true}
                    displayName={word.displayName}
                    letterStatuses={word.letterStatuses}
                    key={`${word.displayName}_${index}`}
                />
            ) : (
                <Word
                    active={false}
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
