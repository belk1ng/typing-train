import React, {
  MutableRefObject,
  createContext,
  useCallback,
  ReactNode,
  useEffect,
  useState,
  useMemo,
  useRef,
} from "react";

import {
  defaultQuotesModeLanguageValue,
  defaultWordsModeLanguageValue,
  defaultQuoteDifficultyValue,
  WordTypeWithLetterStatuses,
  defaultTypingTimeoutValue,
  defaultWordsCountValue,
  QuotesLanguagesStore,
  WordsLanguagesStore,
  QuotesModeLanguages,
  WordsModeLanguages,
  defaultTypingMode,
  TQuoteDifficulty,
  TTypingTimeout,
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

  quotesDifficulty: TQuoteDifficulty;
  setQuotesDifficulty: (difficulty: TQuoteDifficulty) => void;

  typingTimeout: TTypingTimeout;
  setTypingTimeout: (timeout: TTypingTimeout) => void;

  typingMode: TTypingMode;
  setTypingMode: (mode: TTypingMode) => void;

  blockingTypingEvent: boolean;
  setBlockingTypingEvent: (shouldBlock: boolean) => void;

  generateRandomWords: (wordsCount?: number) => void;
  getRandomQuote: () => void;

  typingTime: MutableRefObject<number>;

  correctWords: MutableRefObject<number>;
  correctCharacters: MutableRefObject<number>;
  misspelledWords: MutableRefObject<number>;
  misspelledCharacters: MutableRefObject<number>;
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
  const [wordsCount, setWordsCount] = useState<TWordsCount>(
    defaultWordsCountValue
  );
  const [blockingTypingEvent, setBlockingTypingEvent] =
    useState<boolean>(false);

  const [typingMode, setTypingMode] = useState<TTypingMode>(defaultTypingMode);

  // Words mode language
  const [wordsModeLanguage, setWordsModeLanguage] =
    useState<WordsModeLanguages>(defaultWordsModeLanguageValue);

  // Quotes mode language
  const [quotesModeLanguage, setQuotesModeLanguage] =
    useState<QuotesModeLanguages>(defaultQuotesModeLanguageValue);
  const [quotesDifficulty, setQuotesDifficulty] = useState<TQuoteDifficulty>(
    defaultQuoteDifficultyValue
  );

  // Time mode
  const [typingTimeout, setTypingTimeout] = useState<TTypingTimeout>(
    defaultTypingTimeoutValue
  );

  const typingTime = useRef<number>(0);

  // Variables for statistics
  const correctWords = useRef<number>(0);
  const correctCharacters = useRef<number>(0);

  const misspelledWords = useRef<number>(0);
  const misspelledCharacters = useRef<number>(0);

  // Get words based on current mode
  // TODO: Autoload new words while user is typing

  useEffect(() => {
    getWordsByMode();
  }, [typingMode]);

  useEffect(() => {
    // Get next words after train is over
    if (activeWord === wordsCount) {
      getWordsByMode();
      setTyping(false);
    }
  }, [activeWord]);

  useEffect(() => getRandomQuote(), [quotesModeLanguage, quotesDifficulty]);

  useEffect(
    () => generateRandomWords(wordsCount),
    [wordsCount, wordsModeLanguage]
  );

  // Timer
  useEffect(() => {
    let typingInterval: ReturnType<typeof setInterval> | null = null;

    if (typing) {
      typingInterval = setInterval(() => {
        if (typingTime.current >= typingTimeout && typingMode === "time") {
          setTyping(false);

          setActiveWord(0);
          setActiveLetter(0);
          generateRandomWords(wordsCount);

          calculateStatistics();
        }

        typingTime.current += 0.01;
      }, 10);
    }

    return () => {
      if (typingInterval && typingTime.current) {
        clearInterval(typingInterval);
      }
    };
  }, [typing, typingMode, wordsCount]);

  useEffect(() => {
    // Show statistics only when typing mode is in [words, quotes]
    // and train not skiped

    typingMode !== "time" &&
      typingTime.current > 0 &&
      correctWords.current + misspelledWords.current === wordsArray.length &&
      calculateStatistics();

    // Reset statistics variables
    correctWords.current = 0;
    correctCharacters.current = 0;
    misspelledWords.current = 0;
    misspelledCharacters.current = 0;
    typingTime.current = 0;

    setWords(
      wordsArray.map((word) => ({
        displayName: word,
        letterStatuses: new Array(word.length).fill("unset"),
      }))
    );

    setActiveWord(0);
    setActiveLetter(0);
  }, [wordsArray, typingMode]);

  const generateRandomWords = useCallback(
    (wordsCount = defaultWordsCountValue) => {
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

    const filteredQuotesByDifficulty: Quote[] =
      filterQuotesByDifficultyLevel(allLanguageQuotes);

    setWordsArray(
      filteredQuotesByDifficulty[
        Math.floor(Math.random() * filteredQuotesByDifficulty.length)
      ].text.split(" ")
    );
  }, [quotesModeLanguage, quotesDifficulty]);

  const filterQuotesByDifficultyLevel = (quotesArray: Quote[]): Quote[] => {
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

  const calculateStatistics = (): void => {
    const WPM =
      (correctWords.current + misspelledWords.current) /
      (typingTime.current / 60);
    const clearWPM = WPM - misspelledWords.current / (typingTime.current / 60);

    const CPM =
      (correctCharacters.current + misspelledCharacters.current) /
      (typingTime.current / 60);
    const clearCPM =
      CPM - misspelledCharacters.current / (typingTime.current / 60);

    alert(
      `WPM:  ${Math.round(WPM)}\nclear WPM: ${Math.round(
        clearWPM
      )}\nCPM: ${Math.round(CPM)}\nclear CPM: ${Math.round(clearCPM)}`
    );
  };

  const getWordsByMode = (): void => {
    if (typingMode === "quotes") {
      getRandomQuote();
    } else {
      generateRandomWords(wordsCount);
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
      typingTimeout,
      setTypingTimeout,
      blockingTypingEvent,
      setBlockingTypingEvent,
      generateRandomWords,
      getRandomQuote,
      typingTime,
      correctWords,
      correctCharacters,
      misspelledWords,
      misspelledCharacters,
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
      typingTimeout,
      blockingTypingEvent,
    ]
  );

  return (
    <TypingContext.Provider value={value}>{children}</TypingContext.Provider>
  );
};
