const GameplayScreen = ({ onReveal }) => {
  return (
    <div className="glass-panel center-content">
      <h1 style={{ fontSize: '2.5rem', color: 'var(--accent-color)' }}>Game Started!</h1>
      <p style={{ fontSize: '1.2rem', margin: '40px 0' }}>
        Ask questions freely.<br/>Find the imposter among you.
      </p>
      <button onClick={onReveal} className="danger">
        End Game / Show Imposters
      </button>
    </div>
  );
};

export default GameplayScreen;
