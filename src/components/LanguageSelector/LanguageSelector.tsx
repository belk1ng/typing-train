import { LanguageSelectorModal } from "./LanguageSelectorModal/LanguageSelectorModal";
import { TypingContext } from "../../contexts/TypingContext";
import React, { useState, useContext } from "react";
import { Globe } from "../../assets/icons/Globe";
import s from "./styles.module.scss";

export const LanguageSelector = () => {
  const [modalCollapsed, setModalCollapsed] = useState<boolean>(true);

  const {
    setBlockingTypingEvent,
    quotesModeLanguage,
    wordsModeLanguage,
    typingMode,
    typing,
  } = useContext(TypingContext);

  return (
    <>
      <div
        onClick={() => {
          setModalCollapsed(false);
          setBlockingTypingEvent(true);
        }}
        className={
          !typing ? s["language-selector"] : s["language-selector--hide"]
        }
      >
        <Globe />
        {typingMode === "quotes" ? quotesModeLanguage : wordsModeLanguage}
      </div>
      <LanguageSelectorModal
        modalCollapsed={modalCollapsed}
        setModalCollapsed={setModalCollapsed}
      />
    </>
  );
};
