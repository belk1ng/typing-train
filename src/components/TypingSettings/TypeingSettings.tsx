import { WordsCount } from "./WordsCount/WordsCount";
import s from "./styles.module.scss";
import React from "react";

export const TypingSettings = () => {
  return (
    <div className={s["typing-settings"]}>
      <WordsCount />
    </div>
  );
};
