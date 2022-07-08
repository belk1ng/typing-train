import { WordTypeWithLetterStatuses } from "../contexts/TypingContext";
import React, { forwardRef, memo, useContext } from "react";
import { TypingContext } from "../contexts/TypingContext";
import { WordStyled } from "./styles/Word.styled";

export const InactiveWord = memo(
    ({ displayName, letterStatuses }: WordTypeWithLetterStatuses) => {
        const { renderWordByLetters } = useContext(TypingContext);

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
    const { activeLetter, renderWordByLetters } = useContext(TypingContext);

    return (
        <WordStyled ref={ref} isActive={activeLetter}>
            {renderWordByLetters(displayName, letterStatuses)}
        </WordStyled>
    );
});
