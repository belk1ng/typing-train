import { WordTypeWithLetterStatuses } from "../contexts/TypingContext";
import { WordStyled } from "./styles/Word.styled";
import { LetterStatus } from "../constants";
import { Letter } from "./Letter";
import React, { memo } from "react";

const Word = ({ displayName, letterStatuses }: WordTypeWithLetterStatuses) => {
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

export default memo(Word);
