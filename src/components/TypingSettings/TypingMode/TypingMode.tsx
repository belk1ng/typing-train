import React, { useContext } from "react";
import { TypingContext } from "../../../contexts/TypingContext";

export const TypingMode = () => {
  const { setTypingMode } = useContext(TypingContext);
  return (
    <div>
      <p onClick={() => setTypingMode("words")}>words</p>
      <p onClick={() => setTypingMode("quotes")}>quotes</p>
    </div>
  );
};
