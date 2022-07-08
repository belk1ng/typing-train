import React, {
  useState,
  createContext,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import russian10k from "../languages/russian10k.json";
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
  wordsCount: number;
  setWordsCount: Function;
  generateRandomWords: (wordsCount?: number) => void;
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
  const [wordsCount, setWordsCount] = useState<number>(35);

  useEffect(() => generateRandomWords(wordsCount), [wordsCount]);

  const generateRandomWords = useCallback(
    (wordsCount: number = 35) => {
      let wordsToType: WordTypeWithLetterStatuses[] = [];

      for (let word = 0; word < wordsCount; word++) {
        const randomWord =
          russian10k.words[Math.floor(Math.random() * russian10k.words.length)];

        wordsToType.push({
          displayName: randomWord,
          letterStatuses: new Array(randomWord.length).fill("unset"),
        });
      }

      setWords(wordsToType);
    },
    [wordsCount]
  );

  const value = useMemo(
    () => ({
      activeWord,
      setActiveWord,
      activeLetter,
      setActiveLetter,
      words,
      setWords,
      wordsCount,
      setWordsCount,
      generateRandomWords,
    }),
    [
      activeWord,
      setActiveWord,
      activeLetter,
      setActiveLetter,
      words,
      setWords,
      wordsCount,
      setWordsCount,
    ]
  );

  return (
    <TypingContext.Provider value={value}>{children}</TypingContext.Provider>
  );
};
