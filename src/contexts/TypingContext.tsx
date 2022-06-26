import React, { useState, createContext, useMemo } from "react";
import { LetterStatus } from "../constants";

interface TypingContextProviderProps {
    children: JSX.Element;
}

interface TypingContextProviderValue {
    activeWord: number;
    setActiveWord: Function;
    activeLetter: number;
    setActiveLetter: Function;
    words: WordTypeWithLetterStatuses[];
    setWords: Function;
}

export interface WordTypeWithLetterStatuses {
    displayName: string;
    letterStatuses: LetterStatus[];
}

export const TypingContext = createContext({} as TypingContextProviderValue);

export const TypingContextProvider = ({
    children,
}: TypingContextProviderProps) => {
    const [activeWord, setActiveWord] = useState<number>(0);
    const [activeLetter, setActiveLetter] = useState<number>(0);
    const [words, setWords] = useState<WordTypeWithLetterStatuses[]>([]);

    const value = useMemo(
        () => ({
            activeWord,
            setActiveWord,
            activeLetter,
            setActiveLetter,
            words,
            setWords,
        }),
        [activeWord, activeLetter, words]
    );

    return (
        <TypingContext.Provider value={value}>
            {children}
        </TypingContext.Provider>
    );
};
