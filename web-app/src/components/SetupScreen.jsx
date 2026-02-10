import { useState, useEffect } from 'react';
import wordsData from '../Words-and-hits.json';

const SetupScreen = ({ onStartGame, mode, onBack }) => {
  const [players, setPlayers] = useState([]);
  const [nameInput, setNameInput] = useState('');
  const [imposterCount, setImposterCount] = useState(1);
  const [word, setWord] = useState('');
  const [hint, setHint] = useState('');
  const [manualWords, setManualWords] = useState([]);
  const [selectedCats, setSelectedCats] = useState([]);

  // Hydrate players from localStorage if mostly empty? 
  // App.jsx handles saving the *final* list, but local state here is transient until start.

  const DRAFT_KEY = 'imposter_setup_draft';
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
          if (Array.isArray(data.selectedCats)) setSelectedCats(data.selectedCats);
        }
      } catch (e) { console.error("Failed to load draft", e); }
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
      setNameInput('');
    }
  };

  const removePlayer = (index) => {
    const newPlayers = [...players];
    newPlayers.splice(index, 1);
    setPlayers(newPlayers);
  };

  const addWord = () => {
    if (word.trim() && hint.trim()) {
      setManualWords([...manualWords, { word: word.trim(), hint: hint.trim() }]);
      setWord('');
      setHint('');
    }
  };

  const toggleCat = (cat) => {
    if (selectedCats.includes(cat)) {
      setSelectedCats(selectedCats.filter(c => c !== cat));
    } else {
      setSelectedCats([...selectedCats, cat]);
    }
  };

  const handleStart = () => {
    if (players.length < 3) return alert("Need at least 3 players");
    if (imposterCount >= players.length) return alert("Too many imposters");

    let finalWordList = [...manualWords];

    if (mode === 'CATEGORIES') {
      if (selectedCats.length === 0) return alert("Select at least one category!");
      
      // Merge words from selected categories
      selectedCats.forEach(cat => {
        if (wordsData[cat]) {
           finalWordList = [...finalWordList, ...wordsData[cat]];
        }
      });
    } else {
        if (finalWordList.length === 0) return alert("Add at least one custom word!");
    }
    
    onStartGame({ players, imposterCount, wordsList: finalWordList });
  };

  return (
    <div className="center-content" style={{ justifyContent: 'flex-start', paddingTop: 'env(safe-area-inset-top)', width: '100%', maxWidth: '600px', boxSizing: 'border-box' }}>
      
      {/* Header with aligned Back Arrow */}
      <div style={{ 
        width: '90%', 
        display: 'grid', 
        gridTemplateColumns: '40px 1fr 40px', 
        alignItems: 'center', 
        marginBottom: '20px',
        marginTop: '20px'
      }}>
        <button 
          onClick={onBack}
          style={{ 
            width: '40px', 
            height: '40px', 
            padding: 0, 
            borderRadius: '50%', 
            fontSize: '1.2rem', 
            marginBottom: 0, 
            background: 'rgba(255,255,255,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          ←
        </button>
        <h2 style={{ margin: 0, textAlign: 'center' }}>Setup</h2>
        <div /> {/* Spacer for centering */}
      </div>
      
      <div className="glass-panel" style={{ width: '90%', margin: '0 0 16px 0' }}>
        <h3>1. Add Players</h3>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input 
            value={nameInput} 
            onChange={(e) => setNameInput(e.target.value)}
            placeholder="Player Name"
            onKeyDown={(e) => e.key === 'Enter' && addPlayer()}
          />
          <button onClick={addPlayer} style={{ width: 'auto' }}>+</button>
        </div>
        <div className="player-list">
          {Array.isArray(players) && players.map((p, i) => (
            <div key={i} className="chip">
              {p} <span onClick={() => removePlayer(i)} style={{cursor:'pointer', color:'var(--danger)', fontWeight:'bold', marginLeft: '5px'}}>×</span>
            </div>
          ))}
        </div>
        <div style={{opacity: 0.7}}>Count: {players.length}</div>
      </div>

      <div className="glass-panel" style={{ width: '90%', margin: '0 0 16px 0' }}>
        <h3>2. Imposters</h3>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
          <button 
            style={{ width: '50px' }} 
            onClick={() => setImposterCount(Math.max(1, imposterCount - 1))}
          >-</button>
          <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>{imposterCount}</span>
          <button 
            style={{ width: '50px' }} 
            onClick={() => setImposterCount(Math.min(players.length - 1, imposterCount + 1))}
          >+</button>
        </div>
      </div>

      <div className="glass-panel" style={{ width: '90%', margin: '0 0 16px 0' }}>
        <h3>3. Word Pool</h3>
        
        {mode === 'CATEGORIES' ? (
          <div>
             <p style={{margin: '0 0 10px'}}>Select Categories:</p>
             <div className="player-list" style={{ maxHeight: '200px', overflowY: 'auto', justifyContent: 'center', margin: '10px 0' }}>
                {Object.keys(wordsData).map(cat => (
                  <button 
                    key={cat} 
                    onClick={() => toggleCat(cat)}
                    style={{ 
                      width: 'auto', 
                      margin: '4px',
                      padding: '8px 12px',
                      fontSize: '0.9rem',
                      background: selectedCats.includes(cat) ? 'var(--accent-color)' : 'rgba(255,255,255,0.1)',
                      color: selectedCats.includes(cat) ? '#000' : 'white',
                      border: '1px solid rgba(255,255,255,0.2)'
                    }}
                  >
                    {cat.replace('_', ' ').toUpperCase()}
                  </button>
                ))}
             </div>
             <p style={{fontSize: '0.9rem', opacity: 0.8}}>
               {selectedCats.length} categories selected
            </p>
          </div>
        ) : (
          <div>
            <p style={{margin: '0 0 10px'}}>Add Custom Words:</p>
            <input 
              value={word} 
              onChange={(e) => setWord(e.target.value)} 
              placeholder="Secret Word" 
            />
            <input 
              value={hint} 
              onChange={(e) => setHint(e.target.value)} 
              placeholder="Hint (for Imposter)" 
            />
            <button onClick={addWord} className="secondary">Add Custom Word</button>
            <div>Custom Words Added: {manualWords.length}</div>
          </div>
        )}
      </div>

      <div style={{ width: '90%', paddingBottom: '40px' }}>
        <button onClick={handleStart} style={{ background: 'var(--success)' }}>START GAME</button>
      </div>
    </div>
  );
};

export default SetupScreen;
