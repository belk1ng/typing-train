import React, { createContext, useState, useMemo } from "react";

interface Props {
  children: JSX.Element;
}

interface SettingsContext {
  fontSize: number;
  setFontSize: (fontSize: number) => void;

  wordsContainerWidth: number;
  setWordsContainerWidth: (percentageWidth: number) => void;
}

export const SettingsContext = createContext<SettingsContext>(
  {} as SettingsContext
);

export const SettingsContextProvider = ({ children }: Props) => {
  const [fontSize, setFontSize] = useState<number>(32);
  const [wordsContainerWidth, setWordsContainerWidth] = useState<number>(70);

  const value = useMemo(
    () => ({
      fontSize,
      setFontSize,
      wordsContainerWidth,
      setWordsContainerWidth,
    }),
    [fontSize, wordsContainerWidth]
  );

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};
