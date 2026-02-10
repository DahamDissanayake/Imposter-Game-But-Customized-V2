import { useState } from 'react';

const WelcomeScreen = ({ onStart, onReset }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="glass-panel center-content welcome-panel">
      <h1 style={{ fontSize: '3rem', marginBottom: '40px' }}>Imposter Game</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
        <button onClick={() => onStart('CATEGORIES')} style={{ padding: '20px', fontSize: '1.2rem' }}>
          Play with Preset Categories
        </button>
        
        <button onClick={() => onStart('CUSTOM')} style={{ padding: '20px', fontSize: '1.2rem' }}>
          Play with Custom Words
        </button>
        
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          {showConfirm ? (
            <div className="glass-panel" style={{ 
              position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', 
              zIndex: 1000, padding: '20px', border: '1px solid var(--danger)', width: '300px',
              background: '#2d1b4e' 
            }}>
              <h3>Reset Data?</h3>
              <p>This will erase all players and settings.</p>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                 <button onClick={onReset} className="danger" style={{background: 'var(--danger)'}}>Yes, Reset</button>
                 <button onClick={() => setShowConfirm(false)} className="secondary">Cancel</button>
              </div>
            </div>
          ) : (
            <button 
              onClick={() => setShowConfirm(true)} 
              className="secondary danger" 
              style={{ fontSize: '0.9rem', padding: '10px', width: 'auto', border: '1px solid var(--danger)', color: 'white' }}
            >
              Reset All Saved Data
            </button>
          )}
        </div>
        </div>

      <div style={{ marginTop: 'auto', paddingTop: '20px', fontSize: '0.8rem', opacity: 0.7 }}>
        Credits to <a href="https://github.com/DahamDissanayake/Imposter-Game-But-Customized" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-color)', textDecoration: 'none' }}>DAMA</a>
      </div>
    </div>

  );
};

export default WelcomeScreen;
