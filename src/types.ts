// Typing settings types
export type TypingMode = "words" | "quotes";

export type LetterStatus =
  | "unset"
  | "correct"
  | "incorrect"
  | "skiped"
  | "overflow";

export interface Language {
  words: string[];
}

export interface Quote {
  text: string;
  source: string;
  length: number;
  id: number;
  approvedBy?: string;
}

export interface Quotes {
  quotes: Quote[];
}

export interface WordTypeWithLetterStatuses {
  displayName: string;
  letterStatuses: LetterStatus[];
  overflow?: string;
}

// Typing "Words" languages
export interface WordsLanguagesStore {
  [langName: string]: Language;
}

export type WordsModeLanguages =
  | "english_25k"
  | "russian_10k"
  | "javascript_code"
  | "css_code"
  | "python_code";

export type QuoteDifficulty = "easy" | "middle" | "hard" | "random";

// Typing "Quotes" languages
export interface QuotesLanguagesStore {
  [langName: string]: Quotes;
}

export type QuotesModeLanguages = "russian_quotes" | "english_quotes";

// App settings types
export type TFontSize = 24 | 32 | 36 | 40 | 42;
export const defaultFontSize: TFontSize = 32;
export const fontSizeValues: TFontSize[] = [24, 32, 36, 40, 42];

export type TWordsContainerPercentageWidth = 60 | 70 | 80 | 90;
export const defaultWordsContainerPercentageWidth: TWordsContainerPercentageWidth = 70;
export const wordsContainerPercentageWidthValues: TWordsContainerPercentageWidth[] =
  [60, 70, 80, 90];

export type TConfidenceMode = "off" | "on" | "max";
export const defaultConfidenceMode: TConfidenceMode = "off";
export const confidenceModeValues: TConfidenceMode[] = ["off", "on", "max"];

export type TStrictSpace = "on" | "off";
export const defaultStrictSpace: TStrictSpace = "on";
export const strictSpaceValues: TStrictSpace[] = ["on", "off"];
