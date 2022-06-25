import { WordStyled } from "./styles/Word.styled";
import { Letter } from "./Letter";
import React from "react";

export interface WordProps {
    displayName: string;
}

export type WordType = string;

export const Word = ({ displayName }: WordProps) => {
    const wordByLetters = () => {
        return displayName
            .split("")
            .map((letter, index) => (
                <Letter letter={letter} key={`${letter}_${index}`} />
            ));
    };

    return <WordStyled>{wordByLetters()}</WordStyled>;
};
