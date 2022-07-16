import React, { useContext } from "react";
import { TypingContext } from "../../contexts/TypingContext";
import s from "./styles.module.scss";

export const TypingMode = () => {
  const { setTypingMode, typingMode } = useContext(TypingContext);

  return (
    <div className={s["typing-settings__params"]}>
      <p
        className={
          typingMode === "words"
            ? s["typing-settings__param-value--active"]
            : s["typing-settings__param-value"]
        }
        onClick={() => setTypingMode("words")}
      >
        words
      </p>
      <p
        onClick={() => setTypingMode("quotes")}
        className={
          typingMode === "quotes"
            ? s["typing-settings__param-value--active"]
            : s["typing-settings__param-value"]
        }
      >
        quotes
      </p>
    </div>
  );
};
