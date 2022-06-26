import { WordTypeWithLetterStatuses } from "../contexts/TypingContext";
import { TypingContext } from "../contexts/TypingContext";
import { WordStyled } from "./styles/Word.styled";
import React, { memo, useContext } from "react";
import { LetterStatus } from "../constants";
import { Letter } from "./Letter";

interface WordProps extends WordTypeWithLetterStatuses {
    active: boolean;
}

const Word = ({ displayName, letterStatuses, active }: WordProps) => {
    const { activeLetter } = useContext(TypingContext);

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

    return (
        <WordStyled isActive={active ? activeLetter : false}>
            {wordByLetters()}
        </WordStyled>
    );
};

export default memo(Word);
