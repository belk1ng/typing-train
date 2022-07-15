export type LetterStatus = "unset" | "correct" | "incorrect" | "skiped";

export type Language = {
  words: string[];
};

type Quote = {
  text: string;
  source: string;
  length: number;
  id: number;
  approvedBy?: string;
};

export type Quotes = {
  quotes: Quote[];
};

export type TypingMode = "words" | "quotes";
