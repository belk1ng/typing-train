import React, {
  useState,
  createContext,
  useCallback,
  useMemo,
  useEffect,
} from "react";

import { russian10k } from "../languages/russian10k";
import { english25k } from "../languages/english25k";
import { cssCode } from "../languages/css_code";
import { javascriptCode } from "../languages/javascript_code";
import { pythonCode } from "../languages/python_code";
import { Language, LetterStatus } from "../constants";

interface TypingContextProviderProps {
  children: JSX.Element;
}

export interface WordTypeWithLetterStatuses {
  displayName: string;
  letterStatuses: LetterStatus[];
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
  language: string;
  setLanguage: Function;
  blockingTypingEvent: boolean;
  setBlockingTypingEvent: Function;
  generateRandomWords: (wordsCount?: number) => void;
}

interface TLanguagesStore {
  [langName: string]: Language;
}

export const languages: TLanguagesStore = {
  english_25k: english25k,
  russian_10k: russian10k,
  javascript_code: javascriptCode,
  css_code: cssCode,
  python_code: pythonCode,
};

export const TypingContext = createContext({} as TypingContextProviderValue);

export const TypingContextProvider = ({
  children,
}: TypingContextProviderProps) => {
  const [activeWord, setActiveWord] = useState<number>(0);
  const [activeLetter, setActiveLetter] = useState<number>(0);
  const [wordsArray, setWordsArray] = useState<string[]>([]);
  const [words, setWords] = useState<WordTypeWithLetterStatuses[]>([]);
  const [wordsCount, setWordsCount] = useState<number>(35);
  const [blockingTypingEvent, setBlockingTypingEvent] =
    useState<boolean>(false);

  type LanguageState =
    | "english_25k"
    | "russian_10k"
    | "javascript_code"
    | "css_code"
    | "python_code";

  const [language, setLanguage] = useState<LanguageState>("russian_10k");

  useEffect(() => generateRandomWords(wordsCount), [wordsCount, language]);

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
        const choosenLanguageWords = languages[language].words;
        const randomWord =
          choosenLanguageWords[
            Math.floor(Math.random() * choosenLanguageWords.length)
          ];

        wordsToType.push(randomWord);
      }

      setWordsArray(wordsToType);
    },
    [wordsCount, language]
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
      language,
      setLanguage,
      blockingTypingEvent,
      setBlockingTypingEvent,
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
      language,
      blockingTypingEvent,
    ]
  );

  return (
    <TypingContext.Provider value={value}>{children}</TypingContext.Provider>
  );
};
