import React, { useState, useRef, useEffect, useContext, useMemo } from "react";
import { Modal, handleOutsideClick } from "../../Modal/Modal";
import s from "./styles.module.scss";
import {
  TypingContext,
  wordsLanguages,
  quotesLanguages,
} from "../../../contexts/TypingContext";

interface Props {
  modalCollapsed: boolean;
  setModalCollapsed: Function;
}

export const LanguageSelectorModal = ({
  modalCollapsed,
  setModalCollapsed,
}: Props) => {
  const {
    blockingTypingEvent,
    setBlockingTypingEvent,
    setWordsModeLanguage,
    setQuotesModeLanguage,
    typingMode,
  } = useContext(TypingContext);

  const [searchQuery, setSearchQuery] = useState<string>("");

  const selectorRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [modalCollapsed]);

  const outsideClickCallback = () => {
    setModalCollapsed(true);
    setBlockingTypingEvent(false);
  };

  const languagesListItems = useMemo(() => {
    return Object.entries(
      typingMode === "words" ? wordsLanguages : quotesLanguages
    )
      .filter(([langName, _]) => langName.includes(searchQuery))
      .map(([langName, _]) => (
        <li
          key={`lang_${langName}`}
          className={s["selector__language"]}
          onClick={() => {
            typingMode === "words"
              ? setWordsModeLanguage(langName)
              : setQuotesModeLanguage(langName);

            setModalCollapsed(true);
            setBlockingTypingEvent(false);
            setSearchQuery("");
          }}
        >
          {langName}
        </li>
      ));
  }, [searchQuery, typingMode]);

  return (
    <Modal
      isCollapsed={modalCollapsed}
      onClick={(event) =>
        handleOutsideClick(
          event,
          modalCollapsed,
          selectorRef.current,
          outsideClickCallback
        )
      }
    >
      <div className={s["selector"]} ref={selectorRef}>
        <div className={s["selector__search"]}>
          <input
            ref={inputRef}
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              blockingTypingEvent && setSearchQuery(e.target.value)
            }
            type="text"
            placeholder={"Type to search"}
            className={s["selector__input"]}
          />
          <ul className={s["selector__languages-list"]}>
            {languagesListItems}
          </ul>
        </div>
      </div>
    </Modal>
  );
};
