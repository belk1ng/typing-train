import { LetterStatus } from "../../constants";
import s from "./styles.module.scss";
import React, { memo } from "react";

interface LetterProps {
  letter: string;
  status: LetterStatus;
}

const LetterComponent = ({ letter, status }: LetterProps) => {
  return <span className={s[`letter--${status}`]}>{letter}</span>;
};

export const Letter = memo(LetterComponent);
