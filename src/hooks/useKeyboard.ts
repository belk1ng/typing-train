import { SettingsContext } from "../contexts/SettingsContext";
import { TypingContext } from "../contexts/TypingContext";
import { WordTypeWithLetterStatuses } from "../types";
import { useContext, useEffect } from "react";

export const useKeyboard = (
  area: HTMLTextAreaElement | null,
  isSettingsModalCollapsed: boolean,
  setSettingsModalCollapsed: (value: boolean) => void
) => {
  const {
    setBlockingTypingEvent,
    blockingTypingEvent,
    generateRandomWords,
    setActiveLetter,
    getRandomQuote,
    setActiveWord,
    activeLetter,
    wordsArray,
    activeWord,
    typingMode,
    wordsCount,
    setTyping,
    setWords,
    typing,
    words,
    correctWords,
    correctCharacters,
    misspelledWords,
    misspelledCharacters,
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

        letterStatusCompute === "correct"
          ? (correctCharacters.current += 1)
          : (misspelledCharacters.current += 1);
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
        misspelledCharacters.current += 1;
      };

      const skipRemainingLetters = () => {
        const currentWord = words[activeWord];

        misspelledCharacters.current += currentWord.letterStatuses.filter(
          (status) => status === "unset"
        ).length;

        const currentWordUPD = Object.assign({}, currentWord, {
          letterStatuses: currentWord.letterStatuses.map((status) =>
            status === "unset" ? "skiped" : status
          ),
        });

        setWords((prev: WordTypeWithLetterStatuses[]) =>
          prev.map((word, index) =>
            index === activeWord ? currentWordUPD : word
          )
        );
      };

      const jumpToTheNextWord = () => {
        incrementWordsCounter();

        setActiveLetter(0);
        setActiveWord((prev: number) => prev + 1);
      };

      const setCursorOnLastOverflowCharacterOfPrevWord = (
        prevWord: WordTypeWithLetterStatuses
      ) => {
        misspelledWords.current -= 1;

        setActiveLetter(
          prevWord.displayName.length + prevWord.overflow!.length
        );
      };

      const setCursorOnFirstSkippedCharacterOfPrevWord = (
        prevWord: WordTypeWithLetterStatuses,
        firstSkipedLetterIndex: number
      ) => {
        misspelledWords.current -= 1;
        misspelledCharacters.current -= prevWord.letterStatuses.filter(
          (status) => status === "skiped"
        ).length;

        setActiveLetter(firstSkipedLetterIndex);

        setWords((prev: WordTypeWithLetterStatuses[]) => {
          return prev.map((word, index) =>
            activeWord - 1 === index
              ? {
                  ...word,
                  letterStatuses: word.letterStatuses.map((status) =>
                    status === "skiped" ? "unset" : status
                  ),
                }
              : word
          );
        });
      };

      const removeOverflowCharacter = () => {
        misspelledCharacters.current -= 1;

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
        words[activeWord].letterStatuses[activeLetter - 1] === "correct"
          ? (correctCharacters.current -= 1)
          : (misspelledCharacters.current -= 1);

        setWords((prev: WordTypeWithLetterStatuses[]) =>
          prev.map((word, index) =>
            index === activeWord
              ? {
                  ...word,
                  letterStatuses: word.letterStatuses.map((status, index) =>
                    index === activeLetter - 1 ? "unset" : status
                  ),
                }
              : word
          )
        );

        setActiveLetter((prev: number) => prev - 1);
      };

      const incrementWordsCounter = () => {
        words[activeWord].letterStatuses.filter(
          (status) => status === "correct"
        ).length === words[activeWord].displayName.length
          ? (correctWords.current += 1)
          : (misspelledWords.current += 1);
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
          !typing && setTyping(true);

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
            incrementWordsCounter();
            setActiveWord((prev) => prev + 1);
          } else {
            if (
              activeLetter < typingWord.displayName.length &&
              strictSpace === "off"
            ) {
              skipRemainingLetters();
              jumpToTheNextWord();
            } else if (
              activeLetter < typingWord.displayName.length &&
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

                prevWord.letterStatuses.filter((status) => status === "correct")
                  .length === prevWord.displayName.length
                  ? (correctWords.current -= 1)
                  : (misspelledWords.current -= 1);
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
        } else if (event.code === "Tab") {
          event.preventDefault();

          setTyping(false);

          setActiveWord(0);
          setActiveLetter(0);
          typingMode === "quotes"
            ? getRandomQuote()
            : generateRandomWords(wordsCount);
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

    if (area) {
      area.addEventListener("keydown", keyUpHandler);
    }

    return () => {
      if (area) {
        area.removeEventListener("keydown", keyUpHandler);
      }
    };
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
