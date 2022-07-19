import { LanguageSelector } from "./components/LanguageSelector/LanguageSelector";
import { TypingSettings } from "./components/TypingSettings/TypeingSettings";
import { WordTypeWithLetterStatuses } from "./contexts/TypingContext";
import { WordsList } from "./components/WordsList/WordsList";
import { TypingContext } from "./contexts/TypingContext";
import React, { useEffect, useContext } from "react";
import "./App.scss";

function App() {
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
  } = useContext(TypingContext);

  // TODO: Refactoring component Appap

  useEffect(() => {
    const keyUpHandler = (event: KeyboardEvent) => {
      const typingWord = words[activeWord];

      if (!blockingTypingEvent) {
        if (
          (event.keyCode >= 48 && event.keyCode <= 90) ||
          (event.keyCode >= 106 && event.keyCode <= 111) ||
          (event.keyCode >= 186 && event.keyCode <= 222) ||
          event.keyCode === 173
        ) {
          // Numbers, letters and symbols handling

          const activeWordLength = typingWord.displayName.length;

          if (activeLetter < activeWordLength) {
            const letterStatusCompute =
              event.key === typingWord.displayName[activeLetter];

            const activeWordLetterStatuses = typingWord.letterStatuses;

            const alreadyHasStatus = [
              ...activeWordLetterStatuses.slice(0, activeLetter),
            ];

            const activeWordLetterStatusesUPD = [
              ...alreadyHasStatus,
              letterStatusCompute ? "correct" : "incorrect",
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
          } else {
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
          }
        } else if (event.keyCode === 32) {
          // Space handling

          if (activeLetter === 0) return;

          if (
            (activeWord === wordsCount - 1 && typingMode === "words") ||
            (typingMode === "quotes" && activeWord === wordsArray.length - 1)
          ) {
            setActiveWord(0);
            setActiveLetter(0);
            typingMode === "words"
              ? generateRandomWords(wordsCount)
              : getRandomQuote();
          } else {
            if (activeLetter !== typingWord.displayName.length) {
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
            }

            setActiveLetter(0);
            setActiveWord((prev: number) => prev + 1);
          }
        } else if (event.keyCode === 8) {
          // Backspace handling

          if (activeLetter === 0) {
            if (activeWord === 0) return;

            const prevWord = words[activeWord - 1];

            const firstSkipedLetterIndex =
              prevWord.letterStatuses.indexOf("skiped");

            if (prevWord.overflow) {
              setActiveLetter(
                prevWord.displayName.length + prevWord.overflow?.length
              );
            } else if (firstSkipedLetterIndex !== -1) {
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
            } else {
              setActiveLetter(prevWord.displayName.length);
            }

            setActiveWord((prev: number) => prev - 1);
          } else {
            if (typingWord.overflow) {
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
            } else {
              const activeWordLetterStatusesSetted =
                typingWord.letterStatuses.slice(0, activeLetter - 1);

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
            }

            setActiveLetter((prev: number) => prev - 1);
          }
        } else if (event.keyCode === 13) {
          // Enter handling

          setActiveWord(0);
          setActiveLetter(0);
          typingMode === "words"
            ? generateRandomWords(wordsCount)
            : getRandomQuote();
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
  ]);

  return (
    <div className="wrapper">
      <TypingSettings />
      <LanguageSelector />
      <WordsList />
    </div>
  );
}

export default App;
