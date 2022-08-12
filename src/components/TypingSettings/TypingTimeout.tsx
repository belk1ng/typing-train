import { TTypingTimeout, typingTimeoutValues } from "../../types";
import { AbstractTypingSetting } from "./AbstractTypingSetting";
import { TypingContext } from "../../contexts/TypingContext";
import React, { useContext } from "react";

export const TypingInterval = () => {
  const { typingTimeout, setTypingTimeout } = useContext(TypingContext);

  return (
    <AbstractTypingSetting
      values={typingTimeoutValues}
      value={typingTimeout}
      setValue={(value) => setTypingTimeout(value as TTypingTimeout)}
    />
  );
};
