import { LetterStyled } from "./styles/Letter.styled";
import React from "react";

interface LetterProps {
    letter: string;
    status: "unset" | "correct" | "incorrect";
}

export const Letter = ({ letter, status }: LetterProps) => {
    return <LetterStyled status={status}>{letter}</LetterStyled>;
};
