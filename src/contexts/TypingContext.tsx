import React, {
  createContext,
  useCallback,
  ReactNode,
  useEffect,
  useState,
  useMemo,
} from "react";

import {
  WordTypeWithLetterStatuses,
  QuotesLanguagesStore,
  WordsLanguagesStore,
  QuotesModeLanguages,
  // TypingTimeoutValues,
  WordsModeLanguages,
  QuoteDifficulty,
  // TTypingTimeout,
  TTypingMode,
  TWordsCount,
  Quotes,
  Quote,
} from "../types";

import { javascriptCode } from "../languages/javascript";
import { russian10k } from "../languages/russian10k";
import { english25k } from "../languages/english25k";
import { pythonCode } from "../languages/python";
import { cssCode } from "../languages/css";

import { russianQuotes } from "../languages/russian_quotes";
import { englishQuotes } from "../languages/english_quotes";

interface TypingContextProviderValue {
  typing: boolean;
  setTyping: (value: boolean | ((prev: boolean) => boolean)) => void;

  activeWord: number;
  setActiveWord: (activeWord: number | ((prev: number) => number)) => void;

  activeLetter: number;
  setActiveLetter: (activeLetter: number | ((prev: number) => number)) => void;

  wordsArray: string[];
  setWordsArray: (wordsArray: string[]) => void;

  words: WordTypeWithLetterStatuses[];
  setWords: (
    wordsWithLetterStatuses:
      | WordTypeWithLetterStatuses[]
      | ((prev: WordTypeWithLetterStatuses[]) => WordTypeWithLetterStatuses[])
  ) => void;

  wordsCount: TWordsCount;
  setWordsCount: (count: TWordsCount) => void;

  wordsModeLanguage: WordsModeLanguages;
  setWordsModeLanguage: (language: WordsModeLanguages) => void;

  quotesModeLanguage: string;
  setQuotesModeLanguage: (language: QuotesModeLanguages) => void;

  quotesDifficulty: QuoteDifficulty;
  setQuotesDifficulty: (difficulty: QuoteDifficulty) => void;

  typingMode: TTypingMode;
  setTypingMode: (mode: TTypingMode) => void;

  blockingTypingEvent: boolean;
  setBlockingTypingEvent: (shouldBlock: boolean) => void;

  generateRandomWords: (wordsCount?: number) => void;
  getRandomQuote: () => void;
}

export const wordsLanguages: WordsLanguagesStore = {
  english_25k: english25k,
  russian_10k: russian10k,
  javascript_code: javascriptCode,
  css_code: cssCode,
  python_code: pythonCode,
};

export const quotesLanguages: QuotesLanguagesStore = {
  russian_quotes: russianQuotes,
  english_quotes: englishQuotes,
};

interface Props {
  children: ReactNode;
}

export const TypingContext = createContext({} as TypingContextProviderValue);

export const TypingContextProvider = ({ children }: Props) => {
  const [typing, setTyping] = useState<boolean>(false);

  const [activeWord, setActiveWord] = useState<number>(0);
  const [activeLetter, setActiveLetter] = useState<number>(0);
  const [wordsArray, setWordsArray] = useState<string[]>([]);
  const [words, setWords] = useState<WordTypeWithLetterStatuses[]>([]);
  const [blockingTypingEvent, setBlockingTypingEvent] =
    useState<boolean>(false);

  const [typingMode, setTypingMode] = useState<TTypingMode>("words");

  // Words mode language
  const [wordsModeLanguage, setWordsModeLanguage] =
    useState<WordsModeLanguages>("russian_10k");
  const [wordsCount, setWordsCount] = useState<TWordsCount>(25);

  // Quotes mode language
  const [quotesModeLanguage, setQuotesModeLanguage] =
    useState<QuotesModeLanguages>("russian_quotes");
  const [quotesDifficulty, setQuotesDifficulty] =
    useState<QuoteDifficulty>("easy");

  // Time mode
  // const [timeout, setTimeout] = useState<number>(0);

  useEffect(
    () => generateRandomWords(wordsCount),
    [wordsCount, wordsModeLanguage]
  );

  useEffect(() => getRandomQuote(), [quotesModeLanguage, quotesDifficulty]);

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
    (wordsCount = 35) => {
      const wordsToType: string[] = [];

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

    const allLanguageQuotes: Quote[] = choosenQuotesLanguage.quotes;

    const filteredQuotesByDifficulty =
      filterQuotesByDifficultyLevel(allLanguageQuotes);

    setWordsArray(
      filteredQuotesByDifficulty[
        Math.floor(Math.random() * filteredQuotesByDifficulty.length)
      ].text.split(" ")
    );
  }, [quotesModeLanguage, quotesDifficulty]);

  const filterQuotesByDifficultyLevel = (quotesArray: Quote[]) => {
    switch (quotesDifficulty) {
      case "easy":
        return quotesArray.filter((quote: Quote) => quote.length < 150);
      case "middle":
        return quotesArray.filter(
          (quote: Quote) => quote.length > 150 && quote.length < 650
        );
      case "hard":
        return quotesArray.filter((quote: Quote) => quote.length > 650);
      default:
        return quotesArray;
    }
  };

  const value = useMemo(
    () => ({
      typing,
      setTyping,
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
      quotesDifficulty,
      setQuotesDifficulty,
      typingMode,
      setTypingMode,
      blockingTypingEvent,
      setBlockingTypingEvent,
      generateRandomWords,
      getRandomQuote,
    }),
    [
      typing,
      activeWord,
      activeLetter,
      words,
      setWords,
      wordsArray,
      wordsCount,
      wordsModeLanguage,
      quotesModeLanguage,
      quotesDifficulty,
      typingMode,
      blockingTypingEvent,
    ]
  );

  return (
    <TypingContext.Provider value={value}>{children}</TypingContext.Provider>
  );
};
