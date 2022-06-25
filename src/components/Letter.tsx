import { LetterStyled } from "./styles/Letter.styled";
import { LetterStatus } from "../constants";
import React from "react";

interface LetterProps {
    letter: string;
    status: LetterStatus;
}

export const Letter = ({ letter, status }: LetterProps) => {
    return <LetterStyled status={status}>{letter}</LetterStyled>;
};
