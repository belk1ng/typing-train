import { AppContainerStyled } from "./components/styles/AppContainer.styled";
import { WordTypeWithLetterStatuses } from "./contexts/TypingContext";
import { TypingContext } from "./contexts/TypingContext";
import React, { useEffect, useContext } from "react";
import { WordsList } from "./components/WordsList";
import "./App.css";

function App() {
    const {
        activeWord,
        setActiveWord,
        activeLetter,
        setActiveLetter,
        words,
        setWords,
        generateRandomWords,
    } = useContext(TypingContext);

    useEffect(() => {
        const keyUpHandler = (event: KeyboardEvent) => {
            const typingWord = words[activeWord];

            if (
                (event.keyCode >= 48 && event.keyCode <= 90) ||
                (event.keyCode >= 106 && event.keyCode <= 111) ||
                (event.keyCode >= 186 && event.keyCode <= 222)
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
                            typingWord.displayName.length -
                                alreadyHasStatus.length
                        ).fill("unset"),
                    ];

                    setWords((prev: WordTypeWithLetterStatuses[]) =>
                        prev.map((word, index) =>
                            index === activeWord
                                ? {
                                      ...word,
                                      letterStatuses:
                                          activeWordLetterStatusesUPD,
                                  }
                                : word
                        )
                    );

                    setActiveLetter((prev: number) => prev + 1);
                }
            } else if (event.keyCode === 32) {
                // Space handling

                if (activeLetter === 0) return;

                if (activeWord === 34) {
                    generateRandomWords();
                } else {
                    if (activeLetter !== typingWord.displayName.length) {
                        setWords((prev: WordTypeWithLetterStatuses[]) =>
                            prev.map(({ displayName, letterStatuses }, index) =>
                                index === activeWord
                                    ? {
                                          displayName: displayName,
                                          letterStatuses: letterStatuses.map(
                                              (status) =>
                                                  status === "unset"
                                                      ? "skiped"
                                                      : status
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

                    if (firstSkipedLetterIndex !== -1) {
                        setActiveLetter(
                            prevWord.letterStatuses.indexOf("skiped")
                        );

                        const prevWordLetterStatuses = prevWord.letterStatuses;

                        const alreadyHasStatus = [
                            ...prevWordLetterStatuses.slice(
                                0,
                                firstSkipedLetterIndex
                            ),
                        ];

                        const prevWordLetterStatusesUPD = [
                            ...alreadyHasStatus,
                            ...new Array(
                                prevWord.displayName.length -
                                    alreadyHasStatus.length
                            ).fill("unset"),
                        ];

                        setWords((prev: WordTypeWithLetterStatuses[]) => {
                            return prev.map((word, index) =>
                                activeWord - 1 === index
                                    ? {
                                          ...word,
                                          letterStatuses:
                                              prevWordLetterStatusesUPD,
                                      }
                                    : word
                            );
                        });
                    } else {
                        setActiveLetter(prevWord.displayName.length);
                    }

                    setActiveWord((prev: number) => prev - 1);
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
                                      letterStatuses:
                                          activeWordLetterStatusesUPD,
                                  }
                                : word
                        )
                    );

                    setActiveLetter((prev: number) => prev - 1);
                }
            } else if (event.keyCode === 9) {
                // Tab handling
                // TODO: Tab preventing

                generateRandomWords();
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
    ]);

    return (
        <AppContainerStyled>
            <WordsList wordsCount={35} />
        </AppContainerStyled>
    );
}

export default App;
