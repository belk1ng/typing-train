export type LetterStatus =
  | "unset"
  | "correct"
  | "incorrect"
  | "skiped"
  | "overflow";

export type Language = {
  words: string[];
};

export type Quote = {
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
