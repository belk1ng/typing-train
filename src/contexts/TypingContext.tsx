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
  Quotes,
  Quote,
  TypingMode,
  WordTypeWithLetterStatuses,
  QuoteDifficulty,
  WordsLanguagesStore,
  WordsModeLanguages,
  QuotesModeLanguages,
  QuotesLanguagesStore,
} from "../types";

interface TypingContextProviderValue {
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

  wordsCount: number;
  setWordsCount: (count: number) => void;

  wordsModeLanguage: WordsModeLanguages;
  setWordsModeLanguage: (language: WordsModeLanguages) => void;

  quotesModeLanguage: string;
  setQuotesModeLanguage: (language: QuotesModeLanguages) => void;

  quotesDifficulty: QuoteDifficulty;
  setQuotesDifficulty: (difficulty: QuoteDifficulty) => void;

  typingMode: TypingMode;
  setTypingMode: (mode: TypingMode) => void;

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
  children: JSX.Element;
}

export const TypingContext = createContext({} as TypingContextProviderValue);

export const TypingContextProvider = ({ children }: Props) => {
  const [activeWord, setActiveWord] = useState<number>(0);
  const [activeLetter, setActiveLetter] = useState<number>(0);
  const [wordsArray, setWordsArray] = useState<string[]>([]);
  const [words, setWords] = useState<WordTypeWithLetterStatuses[]>([]);
  const [blockingTypingEvent, setBlockingTypingEvent] =
    useState<boolean>(false);

  const [typingMode, setTypingMode] = useState<TypingMode>("words");

  // Words mode language
  const [wordsModeLanguage, setWordsModeLanguage] =
    useState<WordsModeLanguages>("russian_10k");
  const [wordsCount, setWordsCount] = useState<number>(35);

  // Quotes mode language
  const [quotesModeLanguage, setQuotesModeLanguage] =
    useState<QuotesModeLanguages>("russian_quotes");
  const [quotesDifficulty, setQuotesDifficulty] =
    useState<QuoteDifficulty>("easy");

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
