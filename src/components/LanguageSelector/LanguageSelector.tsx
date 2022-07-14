import { LanguageSelectorModal } from "./LanguageSelectorModal/LanguageSelectorModal";
import { TypingContext } from "../../contexts/TypingContext";
import React, { useState, useContext } from "react";
import { Globe } from "../../icons/Globe";
import s from "./styles.module.scss";

export const LanguageSelector = () => {
  const [modalCollapsed, setModalCollapsed] = useState<boolean>(true);

  const { activeLetter, activeWord, setBlockingTypingEvent, language } =
    useContext(TypingContext);

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
        {language}
      </div>
      <LanguageSelectorModal
        modalCollapsed={modalCollapsed}
        setModalCollapsed={setModalCollapsed}
      />
    </>
  );
};
