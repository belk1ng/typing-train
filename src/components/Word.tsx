import { WordTypeWithLetterStatuses } from "../contexts/TypingContext";
import React, { forwardRef, memo, useContext } from "react";
import { WordStyled } from "./styles/Word.styled";
import { LetterStatus } from "../constants";
import { TypingContext } from "../contexts/TypingContext";
import { Letter } from "./Letter";

export const InactiveWord = memo(({ displayName, letterStatuses }: WordTypeWithLetterStatuses) => {
    // TODO: Refactoring Word components (mb make HOC one)
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
        <WordStyled isActive={false}>
            {wordByLetters()}
        </WordStyled>
    );
})

export const ActiveWord =
    forwardRef<HTMLParagraphElement, WordTypeWithLetterStatuses>(
        ({ displayName, letterStatuses }, ref) => {

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
                <WordStyled ref={ref} isActive={activeLetter}>
                    {wordByLetters()}
                </WordStyled>
            );
        }
    );

