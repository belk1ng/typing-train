import { WordTypeWithLetterStatuses } from "../contexts/TypingContext";
import React, { memo, useContext, forwardRef } from "react";
import { TypingContext } from "../contexts/TypingContext";
import { WordStyled } from "./styles/Word.styled";
import { LetterStatus } from "../constants";
import { Letter } from "./Letter";

interface WordProps extends WordTypeWithLetterStatuses {
    active: boolean;
}

const Word =
    forwardRef<HTMLParagraphElement, WordProps>(
        // TODO: Fix rerender all words except the active one

        ({ displayName, letterStatuses, active }: WordProps, ref) => {
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
                <WordStyled ref={ref} isActive={active ? activeLetter : false}>
                    {wordByLetters()}
                </WordStyled>
            );
        }
    );

export default Word;
