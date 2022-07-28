import React, { createContext, useState, useMemo } from "react";
import {
  TFontSize,
  defaultFontSize,
  TWordsContainerPercentageWidth,
  defaultWordsContainerPercentageWidth,
  TConfidenceMode,
  defaultConfidenceMode,
} from "../types";

interface Props {
  children: JSX.Element;
}

interface SettingsContext {
  fontSize: TFontSize;
  setFontSize: (fontSize: TFontSize) => void;

  wordsContainerWidth: TWordsContainerPercentageWidth;
  setWordsContainerWidth: (
    percentageWidth: TWordsContainerPercentageWidth
  ) => void;

  confidenceMode: TConfidenceMode;
  setConfidenceMode: (mode: TConfidenceMode) => void;
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

  const [confidenceMode, setConfidenceMode] = useState<TConfidenceMode>(
    defaultConfidenceMode
  );

  const value = useMemo(
    () => ({
      fontSize,
      setFontSize,
      wordsContainerWidth,
      setWordsContainerWidth,
      confidenceMode,
      setConfidenceMode,
    }),
    [fontSize, wordsContainerWidth, confidenceMode]
  );

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};
