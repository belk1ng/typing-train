import React, { createContext, useState, useMemo } from "react";

interface Props {
  children: JSX.Element;
}

interface SettingsContext {
  fontSize: number;
  setFontSize: (fontSize: number) => void;
}

export const SettingsContext = createContext<SettingsContext>(
  {} as SettingsContext
);

export const SettingsContextProvider = ({ children }: Props) => {
  const [fontSize, setFontSize] = useState<number>(32);

  const value = useMemo(
    () => ({
      fontSize,
      setFontSize,
    }),
    [fontSize]
  );

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};
