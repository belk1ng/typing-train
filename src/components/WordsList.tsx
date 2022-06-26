import React, { useMemo, useContext } from "react";
import { WordsListStyled } from "./styles/WordList.styled";
import { TypingContext } from "../contexts/TypingContext";
import Word from "./Word";

interface WordsListProps {
    wordsCount: number;
}

export const WordsList = ({ wordsCount }: WordsListProps) => {
    const { words, activeWord, activeLetter } = useContext(TypingContext);

    const wordsToType = useMemo(() => {
        return words.map((word, index) => (
            <Word
                active={index === activeWord}
                displayName={word.displayName}
                letterStatuses={word.letterStatuses}
                key={`${word.displayName}_${index}`}
            />
        ));
    }, [words, activeWord, activeLetter]);

    return <WordsListStyled>{wordsToType}</WordsListStyled>;
};
