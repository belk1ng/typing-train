import React, {
  useState,
  createContext,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import russian10k from "../languages/russian10k.json";
import engilsh25k from "../languages/english25k.json";
import { LetterStatus } from "../constants";

interface TypingContextProviderProps {
  children: JSX.Element;
}

interface TypingContextProviderValue {
  activeWord: number;
  setActiveWord: Function;
  activeLetter: number;
  setActiveLetter: Function;
  wordsArray: string[];
  setWordsArray: Function;
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
  const [wordsArray, setWordsArray] = useState<string[]>([]);
  const [words, setWords] = useState<WordTypeWithLetterStatuses[]>([]);
  const [wordsCount, setWordsCount] = useState<number>(35);

  useEffect(() => generateRandomWords(wordsCount), [wordsCount]);

  useEffect(() => {
    setWords(
      wordsArray.map((word) => ({
        displayName: word,
        letterStatuses: new Array(word.length).fill("unset"),
      }))
    );

    setActiveWord(0);
    setActiveLetter(0);
  }, [wordsArray]);

  const generateRandomWords = useCallback(
    (wordsCount: number = 35) => {
      let wordsToType: string[] = [];

      for (let word = 0; word < wordsCount; word++) {
        const randomWord =
          engilsh25k.words[Math.floor(Math.random() * engilsh25k.words.length)];

        wordsToType.push(randomWord);
      }

      setWordsArray(wordsToType);
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
      wordsArray,
      setWordsArray,
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
      wordsArray,
      wordsCount,
      setWordsCount,
    ]
  );

  return (
    <TypingContext.Provider value={value}>{children}</TypingContext.Provider>
  );
};
