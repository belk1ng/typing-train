import { SettingsContextProvider } from "./contexts/SettingsContext";
import { TypingContextProvider } from "./contexts/TypingContext";
import ReactDOM from "react-dom/client";
import React from "react";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <SettingsContextProvider>
      <TypingContextProvider>
        <App />
      </TypingContextProvider>
    </SettingsContextProvider>
  </React.StrictMode>
);
