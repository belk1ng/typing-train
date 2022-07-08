import { LetterStyled } from "./styles/Letter.styled";
import { LetterStatus } from "../constants";
import React, { memo } from "react";

interface LetterProps {
    letter: string;
    status: LetterStatus;
}

const LetterComponent = ({ letter, status }: LetterProps) => {
    return <LetterStyled status={status}>{letter}</LetterStyled>;
};

export const Letter = memo(LetterComponent);
