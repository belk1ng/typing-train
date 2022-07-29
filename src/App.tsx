import { LanguageSelector } from "./components/LanguageSelector/LanguageSelector";
import { TypingSettings } from "./components/TypingSettings/TypeingSettings";
import { AppSettings } from "./components/AppSettings/AppSettings";
import { SettingsContext } from "./contexts/SettingsContext";
import { WordsList } from "./components/WordsList/WordsList";
import { TypingContext } from "./contexts/TypingContext";
import React, { useContext, useState, useRef, useLayoutEffect } from "react";
import { Header } from "./components/Header/Header";
import { useKeyboard } from "./hooks/useKeyboard";
import "./assets/styles/App.scss";

function App() {
  const { activeWord, activeLetter } = useContext(TypingContext);
  const { wordsContainerWidth } = useContext(SettingsContext);

  const [isSettingsModalCollapsed, setSettingsModalCollapsed] =
    useState<boolean>(true);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useKeyboard(
    textAreaRef.current,
    isSettingsModalCollapsed,
    setSettingsModalCollapsed
  );

  useLayoutEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, [textAreaRef]);

  const handleBlur = () => {
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  };

  return (
    <div className="wrapper">
      <Header isVisible={activeWord === 0 && activeLetter === 0}>
        <AppSettings
          isModalCollapsed={isSettingsModalCollapsed}
          setModalCollapsed={setSettingsModalCollapsed}
        />
        <TypingSettings />
      </Header>
      <main style={{ width: `${wordsContainerWidth}%` }}>
        <LanguageSelector />
        <textarea ref={textAreaRef} onBlur={handleBlur}></textarea>
        <WordsList />
      </main>
    </div>
  );
}

export default App;
