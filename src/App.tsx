import { LanguageSelector } from "./components/LanguageSelector/LanguageSelector";
import { TypingSettings } from "./components/TypingSettings/TypingSettings";
import React, { useContext, useState, useRef, useEffect } from "react";
import { AppSettings } from "./components/AppSettings/AppSettings";
import { Statistics } from "./components/Statistics/Statistics";
import { SettingsContext } from "./contexts/SettingsContext";
import { WordsList } from "./components/WordsList/WordsList";
import { TypingContext } from "./contexts/TypingContext";
import { Header } from "./components/Header/Header";
import { useKeyboard } from "./hooks/useKeyboard";
import "./assets/styles/App.scss";

function App() {
  const {
    blockingTypingEvent,
    quotesModeLanguage,
    wordsModeLanguage,
    quotesDifficulty,
    typingMode,
    wordsCount,
    typing,
  } = useContext(TypingContext);
  const { wordsContainerWidth } = useContext(SettingsContext);

  const [isSettingsModalCollapsed, setSettingsModalCollapsed] =
    useState<boolean>(true);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useKeyboard(
    textAreaRef.current,
    isSettingsModalCollapsed,
    setSettingsModalCollapsed
  );

  // TODO: Fix useEffect to useCallback with ref ??
  useEffect(() => {
    handleBlur();
  }, [
    blockingTypingEvent,
    quotesModeLanguage,
    wordsModeLanguage,
    quotesDifficulty,
    textAreaRef,
    typingMode,
    wordsCount,
  ]);

  const handleBlur = () => {
    if (textAreaRef.current && !blockingTypingEvent) {
      textAreaRef.current.focus();
    }
  };

  return (
    <div className="wrapper">
      <Header isVisible={!typing}>
        <AppSettings
          isModalCollapsed={isSettingsModalCollapsed}
          setModalCollapsed={setSettingsModalCollapsed}
        />
        <TypingSettings />
      </Header>
      <main style={{ width: `${wordsContainerWidth}%` }}>
        <Statistics />
        <LanguageSelector />
        <WordsList />
        <textarea ref={textAreaRef} onBlur={handleBlur}></textarea>
      </main>
    </div>
  );
}

export default App;
