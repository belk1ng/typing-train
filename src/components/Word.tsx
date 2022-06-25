import { WordTypeWithLetterStatuses } from "./WordsList";
import { WordStyled } from "./styles/Word.styled";
import { LetterStatus } from "../constants";
import { Letter } from "./Letter";
import React from "react";

export const Word = ({
    displayName,
    letterStatuses,
}: WordTypeWithLetterStatuses) => {
    const wordByLetters = () => {
        return displayName
            .split("")
            .map((letter, index) => (
                <Letter
                    letter={letter}
                    status={letterStatuses[index] as LetterStatus}
                    key={`${letter}_${index}`}
                />
            ));
    };

    return <WordStyled>{wordByLetters()}</WordStyled>;
};
