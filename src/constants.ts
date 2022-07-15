export type LetterStatus = "unset" | "correct" | "incorrect" | "skiped";

export type Language = {
  words: string[];
};

type Quote = {
  text: string;
  source: string;
  length: number;
  id: number;
};

export type Quotes = {
  quotes: Quote[];
};
