// Global Types

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
