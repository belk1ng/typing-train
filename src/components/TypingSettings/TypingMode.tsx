import { AbstractTypingSetting } from "./AbstractTypingSetting";
import { TypingContext } from "../../contexts/TypingContext";
import { typingModes, TTypingMode } from "../../types";
import React, { useContext } from "react";

export const TypingMode = () => {
  const { setTypingMode, typingMode } = useContext(TypingContext);

  return (
    <AbstractTypingSetting
      values={typingModes}
      value={typingMode}
      setValue={(value) => setTypingMode(value as TTypingMode)}
    />
  );
};
