import React from "react";

interface LetterProps {
    letter: string;
}

export const Letter = ({ letter }: LetterProps) => {
    return <span>{letter}</span>;
};
