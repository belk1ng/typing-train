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

import { russianQuotes } from "../languages/russian_quotes";
import { englishQuotes } from "../languages/english_quotes";

import {
  Language,
  LetterStatus,
  Quotes,
  Quote,
  TypingMode,
} from "../constants";

interface TypingContextProviderProps {
  children: JSX.Element;
}

export interface WordTypeWithLetterStatuses {
  displayName: string;
  letterStatuses: LetterStatus[];
  overflow?: string;
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

  wordsModeLanguage: string;
  setWordsModeLanguage: Function;

  quotesModeLanguage: string;
  setQuotesModeLanguage: Function;

  typingMode: TypingMode;
  setTypingMode: Function;

  blockingTypingEvent: boolean;
  setBlockingTypingEvent: Function;

  generateRandomWords: (wordsCount?: number) => void;
  getRandomQuote: () => void;
}

// Typing "Words" languages
interface TLanguagesStore {
  [langName: string]: Language;
}

export const wordsLanguages: TLanguagesStore = {
  english_25k: english25k,
  russian_10k: russian10k,
  javascript_code: javascriptCode,
  css_code: cssCode,
  python_code: pythonCode,
};

type WordsModeLanguages =
  | "english_25k"
  | "russian_10k"
  | "javascript_code"
  | "css_code"
  | "python_code";

// Typing "Quotes" languages
interface QuotesLanguagesStore {
  [langName: string]: Quotes;
}

export const quotesLanguages: QuotesLanguagesStore = {
  russian_quotes: russianQuotes,
  english_quotes: englishQuotes,
};

type QuotesModeLanguages = "russian_quotes" | "english_quotes";

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

  const [typingMode, setTypingMode] = useState<TypingMode>("words");

  // Words mode language
  const [wordsModeLanguage, setWordsModeLanguage] =
    useState<WordsModeLanguages>("russian_10k");

  // Quotes mode language
  const [quotesModeLanguage, setQuotesModeLanguage] =
    useState<QuotesModeLanguages>("russian_quotes");

  useEffect(
    () => generateRandomWords(wordsCount),
    [wordsCount, wordsModeLanguage]
  );

  useEffect(() => getRandomQuote(), [quotesModeLanguage]);

  useEffect(() => {
    if (typingMode === "words") {
      generateRandomWords(wordsCount);
    } else {
      getRandomQuote();
    }
  }, [typingMode]);

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
        const choosenLanguageWords = wordsLanguages[wordsModeLanguage].words;
        const randomWord =
          choosenLanguageWords[
            Math.floor(Math.random() * choosenLanguageWords.length)
          ];

        wordsToType.push(randomWord);
      }

      setWordsArray(wordsToType);
    },
    [wordsCount, wordsModeLanguage]
  );

  const getRandomQuote = useCallback(() => {
    const choosenQuotesLanguage: Quotes = quotesLanguages[quotesModeLanguage];
    const quotes: Quote[] = choosenQuotesLanguage.quotes;
    setWordsArray(
      quotes[Math.floor(Math.random() * quotes.length)].text.split(" ")
    );
  }, [quotesModeLanguage]);

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
      wordsModeLanguage,
      setWordsModeLanguage,
      quotesModeLanguage,
      setQuotesModeLanguage,
      typingMode,
      setTypingMode,
      blockingTypingEvent,
      setBlockingTypingEvent,
      generateRandomWords,
      getRandomQuote,
    }),
    [
      activeWord,
      activeLetter,
      words,
      setWords,
      wordsArray,
      wordsCount,
      wordsModeLanguage,
      quotesModeLanguage,
      typingMode,
      blockingTypingEvent,
    ]
  );

  return (
    <TypingContext.Provider value={value}>{children}</TypingContext.Provider>
  );
};
