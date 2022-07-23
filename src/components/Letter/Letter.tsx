import { LetterStatus } from "../../types";
import s from "./styles.module.scss";
import React, { memo } from "react";

interface Props {
  letter: string;
  status: LetterStatus;
}

const LetterComponent = ({ letter, status }: Props) => {
  return <span className={s[`letter--${status}`]}>{letter}</span>;
};

export const Letter = memo(LetterComponent);
