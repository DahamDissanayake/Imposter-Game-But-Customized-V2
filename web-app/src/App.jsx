import { useState, useEffect } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import SetupScreen from './components/SetupScreen';
import CategorySelection from './components/CategorySelection';
import PassDeviceScreen from './components/PassDeviceScreen';
import RevealScreen from './components/RevealScreen';
import GameplayScreen from './components/GameplayScreen';
import ResultsScreen from './components/ResultsScreen';
import './index.css';

const STATE_KEY = 'imposter_game_state';

function App() {
  const [screen, setScreen] = useState('WELCOME'); 
  const [players, setPlayers] = useState([]);
  const [wordsPool, setWordsPool] = useState([]);
  const [imposterCount, setImposterCount] = useState(1);

  // Round State
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [currentRoundWord, setCurrentRoundWord] = useState(null);
  const [roundImposters, setRoundImposters] = useState([]);
  const [roundRoles, setRoundRoles] = useState({});

  // Setup Mode State
  const [setupMode, setSetupMode] = useState('CATEGORIES'); // 'CATEGORIES' | 'CUSTOM'
  const [isLoaded, setIsLoaded] = useState(false);

  // --- Persistence ---
  useEffect(() => {
    const saved = localStorage.getItem(STATE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data && data.screen) {
          setScreen(data.screen);
          setPlayers(data.players || []);
          setWordsPool(data.wordsPool || []);
          setImposterCount(data.imposterCount || 1);
          setSetupMode(data.setupMode || 'CATEGORIES');
          setCurrentPlayerIndex(data.currentPlayerIndex || 0);
          setCurrentRoundWord(data.currentRoundWord || null);
          setRoundImposters(data.roundImposters || []);
          setRoundRoles(data.roundRoles || {});
        }
      } catch (e) {
        console.error("Failed to load state", e);
        localStorage.removeItem(STATE_KEY);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return; // Wait for initial load
    
    const state = {
      screen, players, wordsPool, imposterCount, setupMode,
      currentPlayerIndex, currentRoundWord, roundImposters, roundRoles
    };
    localStorage.setItem(STATE_KEY, JSON.stringify(state));
  }, [screen, players, wordsPool, imposterCount, setupMode, currentPlayerIndex, currentRoundWord, roundImposters, roundRoles, isLoaded]);

  useEffect(() => {
    // Validate state integrity
    if (screen === 'PASS' || screen === 'REVEAL' || screen === 'GAME' || screen === 'RESULTS') {
      if (players.length < 3 || !currentRoundWord || Object.keys(roundRoles).length === 0) {
        console.warn("Detected invalid game state, resetting to SETUP");
        setScreen('SETUP'); // Or WELCOME
      }
    }
  }, [screen, players, currentRoundWord, roundRoles]);

  // --- Actions ---

  const startSetup = (mode) => {
    setSetupMode(mode);
    setScreen('SETUP');
  };

  // New: Choose Categories Flow
  const handleChooseCategories = () => setScreen('CATEGORIES');
  
  const handleCategoriesConfirmed = (pool) => {
    setWordsPool(pool);
    setScreen('SETUP');
  };

  const startGame = ({ players: p, imposterCount: c, wordsList: w }) => {
    const finalPool = w && w.length > 0 ? [...wordsPool, ...w] : wordsPool;

    // Shuffle players for random turn order
    const shuffledPlayers = [...p].sort(() => 0.5 - Math.random());

    setPlayers(shuffledPlayers);
    setImposterCount(c);
    setWordsPool(finalPool);
    
    initRound(shuffledPlayers, c, finalPool);
  };

  const initRound = (pList, count, wList) => {
    if (!wList || wList.length === 0) {
      alert("No words available! Add words or categories.");
      setScreen('SETUP'); // Go back to setup to add more
      return;
    }

    // Pick random word
    const randIndex = Math.floor(Math.random() * wList.length);
    const selectedWord = wList[randIndex];
    
    // Remove used word
    const newPool = [...wList];
    newPool.splice(randIndex, 1);
    setWordsPool(newPool);

    setCurrentRoundWord(selectedWord);

    // Assign Roles
    const imposters = [];
    const roles = {};
    // Re-shuffle specifically for roles so turn order (pList) doesn't leak info? 
    // Actually, turn order is pList. If we just pick random imposters from pList, it's fine.
    const playersForRoles = [...pList];
    const shuffledForRoles = [...playersForRoles].sort(() => 0.5 - Math.random());
    
    for (let i = 0; i < count; i++) {
      imposters.push(shuffledForRoles[i]);
    }

    pList.forEach(p => {
      roles[p] = imposters.includes(p) ? 'IMPOSTER' : 'CIVILIAN';
    });

    setRoundImposters(imposters);
    setRoundRoles(roles);
    setCurrentPlayerIndex(0);
    setScreen('PASS');
  };

  const handleSkipRound = () => {
    // Put key back? Optional. Let's discard to avoid repetition.
    // Re-init round with CURRENT pool
    initRound(players, imposterCount, wordsPool);
  };

  const handlePlayerReady = () => setScreen('REVEAL');

  const handleNextPlayer = () => {
    if (currentPlayerIndex < players.length - 1) {
      setCurrentPlayerIndex(currentPlayerIndex + 1);
      setScreen('PASS');
    } else {
      setScreen('GAME');
    }
  };

  const handleRevealImposters = () => setScreen('RESULTS');

  const handleNextRound = () => {
    initRound(players, imposterCount, wordsPool);
  };

  const handleRestart = () => {
    // Confirmed by UI Modal
    localStorage.removeItem(STATE_KEY);
    setScreen('WELCOME');
    setPlayers([]);
    setWordsPool([]);
  };

  const handleClearCache = () => {
    // UI Modal already confirmed execution
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="app-container">
      {screen === 'WELCOME' && (
        <WelcomeScreen 
          onStart={startSetup} 
          onReset={handleClearCache} 
        />
      )}
      
      {screen === 'SETUP' && (
        <SetupScreen 
          onStartGame={startGame} 
          mode={setupMode}
          onBack={() => setScreen('WELCOME')}
        />
      )}
      
      {screen === 'PASS' && (
        <PassDeviceScreen 
          currentPlayer={players[currentPlayerIndex]} 
          onReady={handlePlayerReady} 
        />
      )}
      
      {screen === 'REVEAL' && (
        <RevealScreen 
          player={players[currentPlayerIndex]}
          role={roundRoles[players[currentPlayerIndex]]}
          wordData={currentRoundWord}
          onNext={handleNextPlayer}
          onSkip={handleSkipRound}
          onHome={() => setScreen('WELCOME')}
        />
      )}

      {screen === 'GAME' && <GameplayScreen onReveal={handleRevealImposters} />}

      {screen === 'RESULTS' && (
        <ResultsScreen 
          imposters={roundImposters} 
          wordData={currentRoundWord} 
          onNextRound={handleNextRound}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}

export default App;
