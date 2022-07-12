import React, { createContext, useState, useMemo } from "react";

interface SettingsProviderProps {
  children: JSX.Element;
}

interface ISettingsContext {
  fontSize: number;
  setFontSize: Function;
}

export const SettingsContext = createContext<ISettingsContext>(
  {} as ISettingsContext
);

export const SettingsContextProvider = ({
  children,
}: SettingsProviderProps) => {
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
