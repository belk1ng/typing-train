import React, { useEffect, useMemo, useContext } from "react";
import { WordsListStyled } from "./styles/WordList.styled";
import russian10k from "../languages/russian10k.json";
import {
    TypingContext,
    WordTypeWithLetterStatuses,
} from "../contexts/TypingContext";
import Word from "./Word";

interface WordsListProps {
    wordsCount: number;
}

export const WordsList = ({ wordsCount }: WordsListProps) => {
    const { words, setWords, activeWord, activeLetter } =
        useContext(TypingContext);

    useEffect(() => {
        console.log("Words to type: ", wordsCount);

        let wordsToType: WordTypeWithLetterStatuses[] = [];

        for (let word = 0; word < wordsCount; word++) {
            const randomWord =
                russian10k.words[
                    Math.floor(Math.random() * russian10k.words.length)
                ];

            wordsToType.push({
                displayName: randomWord,
                letterStatuses: new Array(randomWord.length).fill("unset"),
            });
        }

        setWords(wordsToType);
    }, [wordsCount, setWords]);

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
