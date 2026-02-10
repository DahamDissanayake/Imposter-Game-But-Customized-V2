import { useState } from 'react';

const ResultsScreen = ({ imposters, wordData, onNextRound, onRestart }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="glass-panel center-content">
      <h2 style={{ color: 'var(--text-secondary)' }}>The Imposter(s)</h2>
      <h1 style={{ color: 'var(--danger)', fontSize: '2.5rem' }}>
        {imposters.join(', ')}
      </h1>
      
      <div style={{ margin: '40px 0' }}>
        <h3>The Word Was</h3>
        <h1 style={{ color: 'var(--success)' }}>{wordData.word}</h1>
        {wordData.hint && <p style={{ opacity: 0.8, fontStyle: 'italic' }}>Hint: {wordData.hint}</p>}
      </div>

      
      {showConfirm ? (
         <div className="glass-panel" style={{ 
           position: 'absolute', inset: 0, margin: 'auto', height: 'fit-content', width: '90%', 
           border: '1px solid var(--danger)', zIndex: 100,
           background: '#2d1b4e'
         }}>
           <h3>New Game?</h3>
           <p>Current settings will be kept.</p>
           <div style={{ display: 'flex', gap: '10px', justifyContent:'center' }}>
             <button 
               className="danger" style={{background: 'var(--danger)'}}
               onClick={onRestart}
             >Yes, New Game</button>
             <button className="secondary" onClick={() => setShowConfirm(false)}>Cancel</button>
           </div>
         </div>
      ) : (
         <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
           <button onClick={onNextRound}>Next Round</button>
           <button onClick={() => setShowConfirm(true)} className="secondary">New Game Setup</button>
         </div>
      )}
    </div>
  );
};

export default ResultsScreen;
