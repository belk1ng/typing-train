import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  useMemo,
  ChangeEvent,
} from "react";
import { WordsModeLanguages, QuotesModeLanguages } from "../../../types";
import { Modal, handleOutsideClick } from "../../Modal/Modal";
import s from "./styles.module.scss";
import {
  TypingContext,
  wordsLanguages,
  quotesLanguages,
} from "../../../contexts/TypingContext";

interface Props {
  modalCollapsed: boolean;
  setModalCollapsed: (isCollapsed: boolean) => void;
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

  const outsideClickCallback = (): void => {
    setModalCollapsed(true);
    setBlockingTypingEvent(false);
  };

  const languagesListItems = useMemo(() => {
    return Object.entries(
      typingMode === "words" ? wordsLanguages : quotesLanguages
    )
      .filter(([langName]) => langName.includes(searchQuery))
      .map(([langName]) => (
        <li
          key={`lang_${langName}`}
          className={s["selector__language"]}
          onClick={() => {
            typingMode === "words"
              ? setWordsModeLanguage(langName as WordsModeLanguages)
              : setQuotesModeLanguage(langName as QuotesModeLanguages);

            setModalCollapsed(true);
            setBlockingTypingEvent(false);
            setSearchQuery("");
          }}
        >
          {langName}
        </li>
      ));
  }, [searchQuery, typingMode]);

  {
    /* TODO: Fix input bug based on typing textarea focus */
  }

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
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
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
