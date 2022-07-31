import React, { useContext } from "react";
import { TypingContext } from "../../contexts/TypingContext";
import { typingModes } from "../../types";
import s from "./styles.module.scss";

export const TypingMode = () => {
  const { setTypingMode, typingMode } = useContext(TypingContext);

  const typingModeNodes = () => {
    return typingModes.map((mode) => (
      <p
        key={mode}
        className={
          typingMode === mode
            ? s["typing-settings__param-value--active"]
            : s["typing-settings__param-value"]
        }
        onClick={() => setTypingMode(mode)}
      >
        {mode}
      </p>
    ));
  };

  return (
    <div className={s["typing-settings__params"]}>{typingModeNodes()}</div>
  );
};
