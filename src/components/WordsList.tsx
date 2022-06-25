import { WordsListStyled } from "./styles/WordList.styled.js";
import React, { useState, useEffect, useMemo } from "react";
import russian10k from "../languages/russian10k.json";
import { Word, WordType } from "./Word";

interface WordsListProps {
    wordsCount: number;
}

export const WordsList = ({ wordsCount }: WordsListProps) => {
    const [words, setWords] = useState<WordType[]>([]);

    useEffect(() => {
        console.log("Words to type: ", wordsCount);

        const wordsToType: WordType[] = [];

        for (let word = 0; word < wordsCount; word++) {
            const randomWord =
                russian10k.words[
                    Math.floor(Math.random() * russian10k.words.length)
                ];

            wordsToType.push(randomWord);
        }

        setWords(wordsToType);
    }, [wordsCount]);

    const wordsToType = useMemo(() => {
        return words.map((word, index) => (
            <Word displayName={word} key={`${word}_${index}`} />
        ));
    }, [words]);

    return <WordsListStyled>{wordsToType}</WordsListStyled>;
};
