import { SettingsContextProvider } from "./contexts/SettingsContext";
import { TypingContextProvider } from "./contexts/TypingContext";
import ReactDOM from "react-dom/client";
import "./assets/styles/index.scss";
import "./assets/styles/reset.scss";
import React from "react";
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
