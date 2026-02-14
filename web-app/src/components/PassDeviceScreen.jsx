const PassDeviceScreen = ({ currentPlayer, onReady }) => {
  return (
    <div className="w-full max-w-md flex flex-col items-center justify-center animate-fade-in text-center p-6">
      <h2 className="text-gray-500 uppercase tracking-widest text-sm font-bold mb-4">
        Pass device to
      </h2>
      <h1 className="text-5xl font-extrabold text-primary mb-12 break-words w-full">
        {currentPlayer}
      </h1>
      <button
        onClick={onReady}
        className="w-full py-5 bg-primary text-white text-xl font-bold uppercase tracking-widest hover:bg-red-700 transition-colors shadow-lg rounded-sm"
      >
        I am {currentPlayer}
      </button>
    </div>
  );
};

export default PassDeviceScreen;
