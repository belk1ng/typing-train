import React, { createContext, useState, useMemo } from "react";
import {
  TFontSize,
  fontSizeValues,
  defaultFontSize,
  TWordsContainerPercentageWidth,
  wordsContainerPercentageWidthValues,
  defaultWordsContainerPercentageWidth,
} from "../types";

interface Props {
  children: JSX.Element;
}

interface SettingsContext {
  fontSize: TFontSize;
  setFontSize: (fontSize: TFontSize) => void;

  valueIsFontSize: (value: unknown) => boolean;
  valueIsWordsContainerPercentageWidth: (value: unknown) => boolean;

  wordsContainerWidth: TWordsContainerPercentageWidth;
  setWordsContainerWidth: (
    percentageWidth: TWordsContainerPercentageWidth
  ) => void;
}

export const SettingsContext = createContext<SettingsContext>(
  {} as SettingsContext
);

export const SettingsContextProvider = ({ children }: Props) => {
  const [fontSize, setFontSize] = useState<TFontSize>(defaultFontSize);
  const [wordsContainerWidth, setWordsContainerWidth] =
    useState<TWordsContainerPercentageWidth>(
      defaultWordsContainerPercentageWidth
    );

  const valueIsFontSize = (value: unknown): value is TFontSize =>
    fontSizeValues.includes(value as TFontSize) && typeof value === "number"
      ? true
      : false;

  const valueIsWordsContainerPercentageWidth = (
    value: unknown
  ): value is TWordsContainerPercentageWidth =>
    wordsContainerPercentageWidthValues.includes(
      value as TWordsContainerPercentageWidth
    ) && typeof value === "number"
      ? true
      : false;

  const value = useMemo(
    () => ({
      fontSize,
      setFontSize,
      valueIsFontSize,
      wordsContainerWidth,
      setWordsContainerWidth,
      valueIsWordsContainerPercentageWidth,
    }),
    [fontSize, wordsContainerWidth]
  );

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};
