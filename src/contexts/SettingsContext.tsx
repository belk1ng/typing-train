import React, { createContext, useState, useMemo, ReactNode } from "react";
import {
  TFontSize,
  defaultFontSize,
  TWordsContainerPercentageWidth,
  defaultWordsContainerPercentageWidth,
  TConfidenceMode,
  defaultConfidenceMode,
  TStrictSpace,
  defaultStrictSpace,
} from "../types";

interface Props {
  children: ReactNode;
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

  strictSpace: TStrictSpace;
  setStrictSpace: (value: TStrictSpace) => void;
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

  const [strictSpace, setStrictSpace] =
    useState<TStrictSpace>(defaultStrictSpace);

  const value = useMemo(
    () => ({
      fontSize,
      setFontSize,
      wordsContainerWidth,
      setWordsContainerWidth,
      confidenceMode,
      setConfidenceMode,
      strictSpace,
      setStrictSpace,
    }),
    [fontSize, wordsContainerWidth, confidenceMode, strictSpace]
  );

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};
