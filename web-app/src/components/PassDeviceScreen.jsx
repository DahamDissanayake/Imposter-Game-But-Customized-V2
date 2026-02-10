const PassDeviceScreen = ({ currentPlayer, onReady }) => {
  return (
    <div className="glass-panel center-content">
      <h2 style={{ color: 'var(--text-secondary)' }}>Pass device to</h2>
      <h1 style={{ fontSize: '3rem', margin: '40px 0', color: 'var(--accent-color)' }}>
        {currentPlayer}
      </h1>
      <button onClick={onReady}>I am {currentPlayer}</button>
    </div>
  );
};

export default PassDeviceScreen;
