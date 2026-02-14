import { useState, useEffect } from "react";
import wordsData from "../Words-and-hits.json";

const SetupScreen = ({ onStartGame, mode, onBack }) => {
  const [players, setPlayers] = useState([]);
  const [nameInput, setNameInput] = useState("");
  const [imposterCount, setImposterCount] = useState(1);
  const [word, setWord] = useState("");
  const [hint, setHint] = useState("");
  const [manualWords, setManualWords] = useState([]);
  const [selectedCats, setSelectedCats] = useState([]);

  // Hydrate players from localStorage if mostly empty?
  // App.jsx handles saving the *final* list, but local state here is transient until start.

  const DRAFT_KEY = "imposter_setup_draft";
  const [isLoaded, setIsLoaded] = useState(false);

  // Load draft on mount
  useEffect(() => {
    const saved = localStorage.getItem(DRAFT_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data) {
          if (Array.isArray(data.players)) setPlayers(data.players);
          if (data.imposterCount) setImposterCount(data.imposterCount);
          if (Array.isArray(data.manualWords)) setManualWords(data.manualWords);
          if (Array.isArray(data.selectedCats))
            setSelectedCats(data.selectedCats);
        }
      } catch (e) {
        console.error("Failed to load draft", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save draft on change
  useEffect(() => {
    if (!isLoaded) return; // Don't save over draft with empty defaults
    const draft = { players, imposterCount, manualWords, selectedCats };
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  }, [players, imposterCount, manualWords, selectedCats, isLoaded]);

  const addPlayer = () => {
    if (nameInput.trim()) {
      setPlayers([...players, nameInput.trim()]);
      setNameInput("");
    }
  };

  const removePlayer = (index) => {
    const newPlayers = [...players];
    newPlayers.splice(index, 1);
    setPlayers(newPlayers);
  };

  const addWord = () => {
    if (word.trim() && hint.trim()) {
      setManualWords([
        ...manualWords,
        { word: word.trim(), hint: hint.trim() },
      ]);
      setWord("");
      setHint("");
    }
  };

  const toggleCat = (cat) => {
    if (selectedCats.includes(cat)) {
      setSelectedCats(selectedCats.filter((c) => c !== cat));
    } else {
      setSelectedCats([...selectedCats, cat]);
    }
  };

  const handleStart = () => {
    if (players.length < 3) return alert("Need at least 3 players");
    if (imposterCount >= players.length) return alert("Too many imposters");

    let finalWordList = [...manualWords];

    if (mode === "CATEGORIES") {
      if (selectedCats.length === 0)
        return alert("Select at least one category!");

      // Merge words from selected categories
      selectedCats.forEach((cat) => {
        if (wordsData[cat]) {
          finalWordList = [...finalWordList, ...wordsData[cat]];
        }
      });
    } else {
      if (finalWordList.length === 0)
        return alert("Add at least one custom word!");
    }

    onStartGame({ players, imposterCount, wordsList: finalWordList });
  };

  return (
    <div className="w-full max-w-lg flex flex-col gap-6 animate-fade-in pb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 transition-colors shadow-none"
        >
          ←
        </button>
        <h2 className="text-2xl font-bold uppercase tracking-wider text-primary">
          Setup
        </h2>
        <div className="w-10" /> {/* Spacer */}
      </div>

      {/* Players Section */}
      <div className="bg-white p-6 border border-gray-200 rounded-sm">
        <h3 className="text-lg font-bold mb-4 uppercase text-gray-800">
          1. Add Players
        </h3>
        <div className="flex gap-2 mb-4">
          <input
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            placeholder="Player Name"
            className="flex-1 p-3 border-2 border-gray-200 rounded-sm focus:border-primary focus:outline-none transition-colors"
            onKeyDown={(e) => e.key === "Enter" && addPlayer()}
          />
          <button
            onClick={addPlayer}
            className="px-6 bg-primary text-white font-bold rounded-sm hover:bg-red-700 shadow-none"
          >
            +
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-2">
          {Array.isArray(players) &&
            players.map((p, i) => (
              <div
                key={i}
                className="flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm font-medium text-gray-700 border border-gray-200"
              >
                {p}
                <button
                  onClick={() => removePlayer(i)}
                  className="ml-2 w-5 h-5 flex items-center justify-center text-red-500 hover:text-red-700 font-bold bg-transparent p-0 shadow-none min-h-0"
                >
                  ×
                </button>
              </div>
            ))}
        </div>
        <div className="text-right text-xs text-gray-400 font-mono">
          Count: {players.length}
        </div>
      </div>

      {/* Imposters Section */}
      <div className="bg-white p-6 border border-gray-200 rounded-sm">
        <h3 className="text-lg font-bold mb-4 uppercase text-gray-800">
          2. Imposters
        </h3>
        <div className="flex items-center justify-center gap-8">
          <button
            className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-gray-200 text-gray-600 hover:border-primary hover:text-primary font-bold text-2xl shadow-none bg-transparent"
            onClick={() => setImposterCount(Math.max(1, imposterCount - 1))}
          >
            -
          </button>
          <span className="text-4xl font-extrabold text-primary">
            {imposterCount}
          </span>
          <button
            className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-gray-200 text-gray-600 hover:border-primary hover:text-primary font-bold text-2xl shadow-none bg-transparent"
            onClick={() =>
              setImposterCount(Math.min(players.length - 1, imposterCount + 1))
            }
          >
            +
          </button>
        </div>
      </div>

      {/* Word Pool Section */}
      <div className="bg-white p-6 border border-gray-200 rounded-sm">
        <h3 className="text-lg font-bold mb-4 uppercase text-gray-800">
          3. Word Pool
        </h3>

        {mode === "CATEGORIES" ? (
          <div>
            <p className="text-sm text-gray-500 mb-3">Select Categories:</p>
            <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto custom-scrollbar">
              {Object.keys(wordsData).map((cat) => (
                <button
                  key={cat}
                  onClick={() => toggleCat(cat)}
                  className={`px-3 py-2 text-sm font-bold uppercase tracking-wide rounded-sm border-2 transition-all shadow-none ${
                    selectedCats.includes(cat)
                      ? "bg-primary border-primary text-white"
                      : "bg-white border-gray-200 text-gray-500 hover:border-gray-400"
                  }`}
                >
                  {cat.replace("_", " ")}
                </button>
              ))}
            </div>
            <p className="text-right text-xs text-gray-400 font-mono mt-2">
              {selectedCats.length} selected
            </p>
          </div>
        ) : (
          <div>
            <p className="text-sm text-gray-500 mb-3">Add Custom Words:</p>
            <div className="space-y-3">
              <input
                value={word}
                onChange={(e) => setWord(e.target.value)}
                placeholder="Secret Word"
                className="w-full p-3 border-2 border-gray-200 rounded-sm focus:border-primary focus:outline-none"
              />
              <input
                value={hint}
                onChange={(e) => setHint(e.target.value)}
                placeholder="Hint (for Imposter)"
                className="w-full p-3 border-2 border-gray-200 rounded-sm focus:border-primary focus:outline-none"
              />
              <button
                onClick={addWord}
                className="w-full py-3 border-2 border-dashed border-gray-300 text-gray-500 hover:border-primary hover:text-primary font-bold rounded-sm shadow-none bg-transparent"
              >
                + Add Custom Word
              </button>
            </div>
            <div className="text-right text-xs text-gray-400 font-mono mt-2">
              Added: {manualWords.length}
            </div>
          </div>
        )}
      </div>

      <div className="mt-4">
        <button
          onClick={handleStart}
          className="w-full py-5 bg-primary text-white text-xl font-bold uppercase tracking-widest hover:bg-red-700 transition-colors shadow-lg rounded-sm"
        >
          START GAME
        </button>
      </div>
    </div>
  );
};

export default SetupScreen;
