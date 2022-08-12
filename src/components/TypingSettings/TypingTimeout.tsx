import React, { useContext } from "react";
import { TypingContext } from "../../contexts/TypingContext";
import s from "./styles.module.scss";
import { typingTimeoutValues } from "../../types";

export const TypingInterval = () => {
  const { typingTimeout, setTypingTimeout } = useContext(TypingContext);

  // TODO: Make HOC for TypingSettings ???
  // TODO: Make a component instead of html tag

  const timeoutNodes = () => {
    return typingTimeoutValues.map((timeout) => (
      <p
        key={timeout}
        className={
          timeout === typingTimeout
            ? s["typing-settings__param-value--active"]
            : s["typing-settings__param-value"]
        }
        onClick={() => setTypingTimeout(timeout)}
      >
        {timeout}
      </p>
    ));
  };

  return <div className={s["typing-settings__params"]}>{timeoutNodes()}</div>;
};
