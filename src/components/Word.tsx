import { WordTypeWithLetterStatuses } from "../contexts/TypingContext";
import React, { forwardRef, memo, useContext } from "react";
import { TypingContext } from "../contexts/TypingContext";
import { WordStyled } from "./styles/Word.styled";
import { Letter } from "./Letter"; 
import { LetterStatus } from "../constants"; 

const renderWordByLetters = (
    fullWord: string,
    letterStatuses: LetterStatus[]
): JSX.Element[] => {
    return fullWord
        .split("")
        .map((letter, index) => (
            <Letter
                letter={letter}
                status={letterStatuses[index] as LetterStatus}
                key={`${letter}_${index}`}
            />
        ));
};

export const InactiveWord = memo(
    ({ displayName, letterStatuses }: WordTypeWithLetterStatuses) => {
    
        return (
            <WordStyled isActive={false}>
                {renderWordByLetters(displayName, letterStatuses)}
            </WordStyled>
        );
    }
);

export const ActiveWord = forwardRef<
    HTMLParagraphElement,
    WordTypeWithLetterStatuses
>(({ displayName, letterStatuses }, ref) => {
    const { activeLetter } = useContext(TypingContext);

    return (
        <WordStyled ref={ref} isActive={activeLetter}>
            {renderWordByLetters(displayName, letterStatuses)}
        </WordStyled>
    );
});
