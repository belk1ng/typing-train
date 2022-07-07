import { WordTypeWithLetterStatuses } from "../contexts/TypingContext";
import React, { memo, useContext, forwardRef, useEffect } from "react";
import { TypingContext } from "../contexts/TypingContext";
import { WordStyled } from "./styles/Word.styled";
import { LetterStatus } from "../constants";
import { Letter } from "./Letter";

interface WordProps extends WordTypeWithLetterStatuses {
    active: boolean;
}

const Word = memo(
    forwardRef<HTMLParagraphElement, WordProps>(
        ({ displayName, letterStatuses, active }: WordProps, ref) => {
            const { activeLetter } = useContext(TypingContext);

            // useEffect(() => console.log("Rerendered: ", displayName));

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
    )
);

export default Word;
