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
    } = useContext(TypingContext);

    useEffect(() => {
        const keyUpHandler = (event: KeyboardEvent) => {
            const typingWord = words[activeWord];
            console.log(activeWord, activeLetter);
            console.log(words[activeWord]);

            if (event.keyCode >= 48 && event.keyCode <= 90) {
                // Numbers and letters
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
                // Space
                setActiveLetter(0);
                setActiveWord((prev: number) => prev + 1);
            }
        };

        document.addEventListener("keyup", keyUpHandler);

        return () => document.removeEventListener("keyup", keyUpHandler);
    }, [words, activeWord, activeLetter]);

    return (
        <div className="App">
            <WordsList wordsCount={35} />
        </div>
    );
}

export default App;
