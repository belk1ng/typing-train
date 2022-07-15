import React, { useState, useRef, useEffect, useContext, useMemo } from "react";
import { TypingContext, languages } from "../../../contexts/TypingContext";
import s from "./styles.module.scss";

interface Props {
  modalCollapsed: boolean;
  setModalCollapsed: Function;
}

export const LanguageSelectorModal = ({
  modalCollapsed,
  setModalCollapsed,
}: Props) => {
  const { blockingTypingEvent, setBlockingTypingEvent, setWordsModeLanguage } =
    useContext(TypingContext);

  const [searchQuery, setSearchQuery] = useState<string>("");

  const modalWindowRef = useRef<HTMLDivElement>(null);
  const selectorRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const el = selectorRef.current;

      if (el && !el.contains(event.target as Node) && !modalCollapsed) {
        setModalCollapsed(true);
        setBlockingTypingEvent(false);
      }
    };

    if (modalWindowRef.current) {
      modalWindowRef.current.addEventListener("click", handleOutsideClick);
    }

    return () => {
      if (modalWindowRef.current) {
        return modalWindowRef.current.addEventListener(
          "click",
          handleOutsideClick
        );
      }
    };
  }, [selectorRef, modalCollapsed]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [modalCollapsed]);

  const languagesListItems = useMemo(() => {
    return Object.entries(languages)
      .filter(([langName, _]) => langName.includes(searchQuery))
      .map(([langName, _]) => (
        <li
          className={s["selector__language"]}
          onClick={() => {
            setWordsModeLanguage(langName);
            setModalCollapsed(true);
            setBlockingTypingEvent(false);
            setSearchQuery("");
          }}
        >
          {langName}
        </li>
      ));
  }, [searchQuery]);

  return (
    <div
      className={modalCollapsed ? s["modal--hide"] : s["modal"]}
      ref={modalWindowRef}
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
    </div>
  );
};
