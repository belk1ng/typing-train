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

                if (activeWord === 34) {
                    generateRandomWords();
                } else {
                    setActiveLetter(0);
                    setActiveWord((prev: number) => prev + 1);
                }
            } else if (event.keyCode === 8) {
                // Backspace handling

                if (activeLetter === 0) {
                    const prevWord = words[activeWord - 1];

                    setActiveWord((prev: number) => prev - 1);
                    setActiveLetter(prevWord.displayName.length);
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

                event.preventDefault();
                event.stopPropagation();
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
        <div className="App">
            <WordsList wordsCount={35} />
        </div>
    );
}

export default App;
