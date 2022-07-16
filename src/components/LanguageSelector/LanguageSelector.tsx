import { LanguageSelectorModal } from "./LanguageSelectorModal/LanguageSelectorModal";
import { TypingContext } from "../../contexts/TypingContext";
import React, { useState, useContext } from "react";
import { Globe } from "../../icons/Globe";
import s from "./styles.module.scss";

export const LanguageSelector = () => {
  const [modalCollapsed, setModalCollapsed] = useState<boolean>(true);

  const {
    activeLetter,
    activeWord,
    setBlockingTypingEvent,
    wordsModeLanguage,
    quotesModeLanguage,
    typingMode,
  } = useContext(TypingContext);

  return (
    <>
      <div
        onClick={() => {
          setModalCollapsed(false);
          setBlockingTypingEvent(true);
        }}
        className={
          activeWord === 0 && activeLetter === 0
            ? s["language-selector"]
            : s["language-selector--hide"]
        }
      >
        <Globe />
        {typingMode === "words" ? wordsModeLanguage : quotesModeLanguage}
      </div>
      {/* TODO: Statement rendering modal for any types of Typing mode */}
      <LanguageSelectorModal
        modalCollapsed={modalCollapsed}
        setModalCollapsed={setModalCollapsed}
      />
    </>
  );
};
