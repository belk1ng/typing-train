import { WordsListStyled } from "./styles/WordList.styled";
import React, { useState, useEffect, useMemo } from "react";
import russian10k from "../languages/russian10k.json";
import { Word } from "./Word";

interface WordsListProps {
    wordsCount: number;
}

export interface WordTypeWithLetterStatuses {
    displayName: string;
    letterStatuses: "unset" | "correct" | "incorrect"[];
}

export const WordsList = ({ wordsCount }: WordsListProps) => {
    const [words, setWords] = useState<WordTypeWithLetterStatuses[]>([]);

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
    }, [wordsCount]);

    const wordsToType = useMemo(() => {
        return words.map((word, index) => (
            <Word
                displayName={word.displayName}
                letterStatuses={word.letterStatuses}
                key={`${word.displayName}_${index}`}
            />
        ));
    }, [words]);

    return <WordsListStyled>{wordsToType}</WordsListStyled>;
};
