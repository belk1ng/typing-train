import { SettingsContext } from "../contexts/SettingsContext";
import { TypingContext } from "../contexts/TypingContext";
import { WordTypeWithLetterStatuses } from "../types";
import { useContext, useEffect } from "react";

export const useKeyboard = (
  isSettingsModalCollapsed: boolean,
  setSettingsModalCollapsed: (value: boolean) => void
) => {
  const {
    wordsArray,
    activeWord,
    setActiveWord,
    activeLetter,
    setActiveLetter,
    words,
    setWords,
    wordsCount,
    typingMode,
    generateRandomWords,
    getRandomQuote,
    blockingTypingEvent,
    setBlockingTypingEvent,
  } = useContext(TypingContext);

  const { confidenceMode, strictSpace } = useContext(SettingsContext);

  useEffect(() => {
    const keyUpHandler = (event: KeyboardEvent) => {
      const typingWord = words[activeWord];

      const changePressedCharacterStatus = () => {
        const letterStatusCompute =
          event.key === typingWord.displayName[activeLetter]
            ? "correct"
            : "incorrect";

        const activeWordLetterStatuses = typingWord.letterStatuses;

        const alreadyHasStatus = [
          ...activeWordLetterStatuses.slice(0, activeLetter),
        ];

        const activeWordLetterStatusesUPD = [
          ...alreadyHasStatus,
          letterStatusCompute,
          ...new Array(
            typingWord.displayName.length - alreadyHasStatus.length - 1
          ).fill("unset"),
        ];

        setWords((prev: WordTypeWithLetterStatuses[]) =>
          prev.map((word, index) =>
            index === activeWord
              ? {
                  ...word,
                  letterStatuses: activeWordLetterStatusesUPD,
                }
              : word
          )
        );

        setActiveLetter((prev: number) => prev + 1);
      };

      const addOverflowCharacter = () => {
        setWords((prev: WordTypeWithLetterStatuses[]) =>
          prev.map((word, index) =>
            index === activeWord
              ? {
                  ...word,
                  overflow: word.overflow
                    ? word.overflow + event.key
                    : event.key,
                }
              : word
          )
        );

        setActiveLetter((prev: number) => prev + 1);
      };

      const getNextTrain = () => {
        setActiveWord(0);
        setActiveLetter(0);
        typingMode === "words"
          ? generateRandomWords(wordsCount)
          : getRandomQuote();
      };

      const skipRemainingLetters = () => {
        setWords((prev: WordTypeWithLetterStatuses[]) =>
          prev.map(({ displayName, letterStatuses, overflow }, index) =>
            index === activeWord
              ? {
                  displayName,
                  overflow,
                  letterStatuses: letterStatuses.map((status) =>
                    status === "unset" ? "skiped" : status
                  ),
                }
              : { displayName, letterStatuses }
          )
        );
      };

      const jumpToTheNextWord = () => {
        setActiveLetter(0);
        setActiveWord((prev: number) => prev + 1);
      };

      const setCursorOnLastOverflowCharacterOfPrevWord = (
        prevWord: WordTypeWithLetterStatuses
      ) => {
        setActiveLetter(
          prevWord.displayName.length + prevWord.overflow!.length
        );
      };

      const setCursorOnFirstSkippedCharacterOfPrevWord = (
        prevWord: WordTypeWithLetterStatuses,
        firstSkipedLetterIndex: number
      ) => {
        setActiveLetter(prevWord.letterStatuses.indexOf("skiped"));

        const prevWordLetterStatuses = prevWord.letterStatuses;

        const alreadyHasStatus = [
          ...prevWordLetterStatuses.slice(0, firstSkipedLetterIndex),
        ];

        const prevWordLetterStatusesUPD = [
          ...alreadyHasStatus,
          ...new Array(
            prevWord.displayName.length - alreadyHasStatus.length
          ).fill("unset"),
        ];

        setWords((prev: WordTypeWithLetterStatuses[]) => {
          return prev.map((word, index) =>
            activeWord - 1 === index
              ? {
                  ...word,
                  letterStatuses: prevWordLetterStatusesUPD,
                }
              : word
          );
        });
      };

      const removeOverflowCharacter = () => {
        setWords((prev: WordTypeWithLetterStatuses[]) =>
          prev.map((word, index) =>
            index === activeWord
              ? {
                  ...word,
                  overflow:
                    word.overflow &&
                    word.overflow.slice(0, word.overflow.length - 1),
                }
              : word
          )
        );
        setActiveLetter((prev: number) => prev - 1);
      };

      const removeCharacter = () => {
        const activeWordLetterStatusesSetted = typingWord.letterStatuses.slice(
          0,
          activeLetter - 1
        );

        const activeWordLetterStatusesUPD = [
          ...activeWordLetterStatusesSetted,
          ...new Array(
            typingWord.displayName.length -
              activeWordLetterStatusesSetted.length
          ).fill("unset"),
        ];

        setWords((prev: WordTypeWithLetterStatuses[]) =>
          prev.map((word, index) =>
            index === activeWord
              ? {
                  ...word,
                  letterStatuses: activeWordLetterStatusesUPD,
                }
              : word
          )
        );
        setActiveLetter((prev: number) => prev - 1);
      };

      if (!blockingTypingEvent) {
        const letterRegExp = /Key[A-Z]/,
          numberRegExp = /Digit[0-9]/,
          symbolCodesSet = [
            "Backquote",
            "Backslash",
            "BracketLeft",
            "BracketRight",
            "Comma",
            "Equal",
            "IntlBackslash",
            "IntlRo",
            "IntlYen",
            "Minus",
            "Period",
            "Quote",
            "Semicolon",
            "Slash",
          ];
        if (
          letterRegExp.test(event.code) ||
          numberRegExp.test(event.code) ||
          symbolCodesSet.includes(event.code)
        ) {
          const activeWordLength = typingWord.displayName.length;

          if (activeLetter < activeWordLength) {
            changePressedCharacterStatus();
          } else {
            addOverflowCharacter();
          }
        } else if (event.code === "Space") {
          if (
            (activeWord === wordsCount - 1 && typingMode === "words") ||
            (typingMode === "quotes" && activeWord === wordsArray.length - 1)
          ) {
            getNextTrain();
          } else {
            if (
              activeLetter !== typingWord.displayName.length &&
              strictSpace === "off"
            ) {
              skipRemainingLetters();
              jumpToTheNextWord();
            } else if (
              activeLetter !== typingWord.displayName.length &&
              strictSpace === "on"
            ) {
              changePressedCharacterStatus();
            } else {
              jumpToTheNextWord();
            }
          }
        } else if (
          event.code === "Backspace" &&
          confidenceMode !== "max" &&
          ((activeLetter === 0 && activeWord !== 0) || activeLetter > 0)
        ) {
          if (activeLetter === 0) {
            if (confidenceMode !== "on") {
              const prevWord = words[activeWord - 1];

              const firstSkipedLetterIndex =
                prevWord.letterStatuses.indexOf("skiped");

              if (prevWord.overflow) {
                setCursorOnLastOverflowCharacterOfPrevWord(prevWord);
              } else if (firstSkipedLetterIndex !== -1) {
                setCursorOnFirstSkippedCharacterOfPrevWord(
                  prevWord,
                  firstSkipedLetterIndex
                );
              } else {
                setActiveLetter(prevWord.displayName.length);
              }

              setActiveWord((prev: number) => prev - 1);
            }
          } else {
            if (typingWord.overflow) {
              removeOverflowCharacter();
            } else {
              removeCharacter();
            }
          }
        } else if (event.code === "Enter") {
          setActiveWord(0);
          setActiveLetter(0);
          typingMode === "words"
            ? generateRandomWords(wordsCount)
            : getRandomQuote();
        } else if (
          event.code === "Escape" &&
          activeWord === 0 &&
          activeLetter === 0 &&
          isSettingsModalCollapsed
        ) {
          setBlockingTypingEvent(true);
          setSettingsModalCollapsed(false);
        }
      }
    };

    document.addEventListener("keyup", keyUpHandler);

    return () => document.removeEventListener("keyup", keyUpHandler);
  }, [
    words,
    activeWord,
    activeLetter,
    setWords,
    setActiveWord,
    setActiveLetter,
    blockingTypingEvent,
    typingMode,
    confidenceMode,
    strictSpace,
  ]);
};
