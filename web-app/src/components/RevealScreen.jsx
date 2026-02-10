import { useState } from 'react';

const RevealScreen = ({ player, role, wordData, onNext, onSkip, onHome }) => {
  const [showSkipConfirm, setShowSkipConfirm] = useState(false);
  const [showHomeConfirm, setShowHomeConfirm] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  const handleStart = () => setIsRevealed(true);
  const handleEnd = () => setIsRevealed(false);

  // Defensive Check
  if (!player) return <div className="glass-panel center-content"><h1>Error: No Player Found</h1><button onClick={onNext}>Next</button></div>;
  if (!wordData && role !== 'IMPOSTER') return <div className="glass-panel center-content"><h1>Error: No Word Data</h1><button onClick={onSkip}>Skip Round</button></div>;

  return (
    <div className="glass-panel center-content" style={{ userSelect: 'none' }}>
      <h1>{player}</h1>
      <p>Press and HOLD the button to see your secret role.</p>
      
      <div style={{ height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {isRevealed ? (
          <div>
            {role === 'IMPOSTER' ? (
              <div className="imposter-reveal">
                YOU ARE THE IMPOSTER!<br/>
                <span style={{fontSize: '1rem', color: 'white'}}>
                   Hint: {wordData?.hint || "No hint available"}
                </span>
              </div>
            ) : (
              <div className="civilian-reveal">
                Word: {wordData?.word || "Error"}
              </div>
            )}
          </div>
        ) : (
          <h1 style={{ color: '#555' }}>???</h1>
        )}
      </div>

      <button 
        onMouseDown={handleStart}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleStart}
        onTouchEnd={handleEnd}
        style={{ 
          background: isRevealed ? '#333' : 'var(--primary-color)',
          height: '80px',
          fontSize: '1.2rem'
        }}
      >
        HOLD TO VIEW
      </button>

      {/* Action Buttons & Modals */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '30px' }}>
        
        {/* Skip Modal */}
        {showSkipConfirm ? (
          <div className="glass-panel" style={{ 
            position: 'absolute', inset: 0, margin: 'auto', height: 'fit-content', width: '90%', 
            border: '1px solid var(--danger)', zIndex: 100,
            background: '#2d1b4e'
          }}>
            <h3>Skip Round?</h3>
            <p>Pick a new word and restart round?</p>
            <div style={{ display: 'flex', gap: '10px', justifyContent:'center' }}>
              <button 
                className="danger" style={{background: 'var(--danger)'}}
                onClick={() => { onSkip(); setShowSkipConfirm(false); }}
              >Yes</button>
              <button className="secondary" onClick={() => setShowSkipConfirm(false)}>Cancel</button>
            </div>
          </div>
        ) : null}

        {/* Home Modal */}
        {showHomeConfirm ? (
          <div className="glass-panel" style={{ 
             position: 'absolute', inset: 0, margin: 'auto', height: 'fit-content', width: '90%', 
             border: '1px solid var(--text-secondary)', zIndex: 100,
             background: '#2d1b4e'
           }}>
             <h3>Exit to Home?</h3>
             <p>Game progress will be paused.</p>
             <div style={{ display: 'flex', gap: '10px', justifyContent:'center' }}>
               <button 
                 style={{background: 'var(--text-secondary)', color: 'black'}}
                 onClick={() => { onHome(); setShowHomeConfirm(false); }}
               >Yes, Exit</button>
               <button className="secondary" onClick={() => setShowHomeConfirm(false)}>Cancel</button>
             </div>
           </div>
        ) : null}


        <button onClick={onNext} className="secondary" style={{ border: '2px solid white' }}>
          Done / Next Player &gt;&gt;
        </button>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={() => setShowSkipConfirm(true)} 
            className="secondary" 
            style={{ borderColor: 'var(--danger)', color: 'var(--danger)', fontSize: '0.9rem', padding: '10px', flex: 1 }}
          >
            Skip Round
          </button>
          <button 
             onClick={() => setShowHomeConfirm(true)}
             className="secondary" 
             style={{ borderColor: 'var(--text-secondary)', color: 'var(--text-secondary)', fontSize: '0.9rem', padding: '10px', flex: 1 }}
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
}; // End Component

export default RevealScreen;
