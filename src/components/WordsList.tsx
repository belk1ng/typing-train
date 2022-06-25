import React, { useEffect } from "react";
import russian10k from "../languages/russian10k.json";

interface WordsListProps {
    wordsCount: number;
}

export const WordsList = ({ wordsCount }: WordsListProps) => {
    useEffect(() => {
        console.log("Words count: ", wordsCount);

        const wordsToType = [];

        for (let word = 0; word < wordsCount; word++) {
            wordsToType.push(
                russian10k.words[
                    Math.floor(Math.random() * russian10k.words.length)
                ]
            );
        }

        console.log(wordsToType);
    }, []);

    return <div></div>;
};
