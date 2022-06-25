import React from "react";
import "./App.css";
import { WordsList } from "./components/WordsList";

function App() {
    return (
        <div className="App">
            <WordsList wordsCount={35} />
        </div>
    );
}

export default App;
