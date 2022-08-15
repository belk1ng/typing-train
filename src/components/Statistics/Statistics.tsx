import { TypingContext } from "../../contexts/TypingContext";
import { Modal, handleOutsideClick } from "../Modal/Modal";
import React, { useContext, useRef } from "react";
import s from "./styles.module.scss";

export const Statistics = () => {
  const {
    setDisplayStatistics,
    displayStatistics,
    setActiveLetter,
    getWordsByMode,
    setActiveWord,
    statistics,
    setWords,
  } = useContext(TypingContext);

  const statisticsRef = useRef<HTMLDivElement>(null);

  const handleNextClick = () => {
    getWordsByMode();

    setDisplayStatistics(false);
  };

  const handleRestartClick = () => {
    setActiveWord(0);
    setActiveLetter(0);

    setWords((prev) =>
      prev.map((word) => ({
        ...word,
        letterStatuses: new Array(word.letterStatuses.length).fill("unset"),
        overflow: "",
      }))
    );

    setDisplayStatistics(false);
  };

  const outsideClickCallback = () => {
    setDisplayStatistics(false);
    handleNextClick();
  };

  return (
    <Modal
      isCollapsed={!displayStatistics}
      onClick={(event) => {
        handleOutsideClick(
          event,
          !displayStatistics,
          statisticsRef.current,
          outsideClickCallback
        );
      }}
    >
      <div className={s.statistics} ref={statisticsRef}>
        <p className={s.statistics__point}>
          WPM: {Math.round(statistics.current.WPM)}
        </p>
        <p className={s.statistics__point}>
          net WPM: {Math.round(statistics.current.netWPM)}
        </p>
        <p className={s.statistics__point}>
          CPM: {Math.round(statistics.current.CPM)}
        </p>
        <p className={s.statistics__point}>
          net CPM: {Math.round(statistics.current.netCPM)}
        </p>

        <div className={s.statistics__actions}>
          <button
            className={s.statistics__action}
            onClick={() => handleRestartClick()}
          >
            Restart
          </button>
          <button
            className={s.statistics__action}
            onClick={() => handleNextClick()}
          >
            Next
          </button>
        </div>
      </div>
    </Modal>
  );
};
