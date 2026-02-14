import { useState } from "react";

const ResultsScreen = ({ imposters, wordData, onNextRound, onRestart }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="w-full max-w-md flex flex-col items-center animate-fade-in text-center p-6 space-y-8">
      <div className="w-full bg-white border border-gray-200 p-8 rounded-sm shadow-sm">
        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">
          The Imposter(s)
        </h2>
        <h1 className="text-4xl font-black text-primary break-words">
          {imposters.join(", ")}
        </h1>
      </div>

      <div className="w-full bg-primary p-8 rounded-sm shadow-sm text-white">
        <h3 className="text-sm font-bold text-red-100 uppercase tracking-widest mb-4">
          The Word Was
        </h3>
        <h1 className="text-4xl font-black mb-2">{wordData.word}</h1>
        {wordData.hint && (
          <p className="text-red-100 italic text-sm">Hint: {wordData.hint}</p>
        )}
      </div>

      {showConfirm ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white p-6 w-full max-w-sm rounded-sm shadow-xl text-center">
            <h3 className="text-xl font-bold text-primary mb-2">New Game?</h3>
            <p className="text-gray-600 mb-6">Current settings will be kept.</p>
            <div className="flex gap-3">
              <button
                className="flex-1 bg-primary text-white py-3 font-bold rounded-sm hover:bg-red-700"
                onClick={onRestart}
              >
                Yes
              </button>
              <button
                className="flex-1 border border-gray-300 text-gray-600 py-3 font-bold rounded-sm hover:bg-gray-50"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col gap-4 mt-8">
          <button
            onClick={onNextRound}
            className="w-full py-5 bg-white border-2 border-primary text-primary text-xl font-bold uppercase tracking-widest hover:bg-red-50 transition-colors shadow-none rounded-sm"
          >
            Next Round
          </button>
          <button
            onClick={() => setShowConfirm(true)}
            className="text-sm font-bold text-gray-400 hover:text-gray-600 uppercase tracking-widest py-3"
          >
            New Game Setup
          </button>
        </div>
      )}
    </div>
  );
};

export default ResultsScreen;
