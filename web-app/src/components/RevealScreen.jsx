import { useState } from "react";

const RevealScreen = ({ player, role, wordData, onNext, onSkip, onHome }) => {
  const [showSkipConfirm, setShowSkipConfirm] = useState(false);
  const [showHomeConfirm, setShowHomeConfirm] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  const handleStart = () => setIsRevealed(true);
  const handleEnd = () => setIsRevealed(false);

  // Defensive Check
  if (!player)
    return (
      <div className="p-10 text-center">
        <h1 className="text-primary font-bold">Error: No Player Found</h1>
        <button onClick={onNext} className="mt-4 px-4 py-2 bg-gray-200">
          Next
        </button>
      </div>
    );
  if (!wordData && role !== "IMPOSTER")
    return (
      <div className="p-10 text-center">
        <h1 className="text-primary font-bold">Error: No Word Data</h1>
        <button onClick={onSkip} className="mt-4 px-4 py-2 bg-gray-200">
          Skip Round
        </button>
      </div>
    );

  return (
    <div className="w-full max-w-md flex flex-col items-center animate-fade-in select-none p-6">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{player}</h1>
      <p className="text-sm text-gray-500 uppercase tracking-widest mb-8">
        Role Reveal
      </p>

      <div className="w-full h-48 mb-8 relative">
        <div
          className={`w-full h-full rounded-sm flex flex-col items-center justify-center border-4 py-4 px-6 transition-all duration-200 ${
            isRevealed
              ? role === "IMPOSTER"
                ? "bg-primary border-primary"
                : "bg-white border-primary"
              : "bg-gray-100 border-gray-200"
          }`}
        >
          {isRevealed ? (
            <div className="text-center animate-fade-in">
              {role === "IMPOSTER" ? (
                <>
                  <div className="text-5xl font-black text-white mb-2 leading-none">
                    IMPOSTER
                  </div>
                  <div className="text-white text-opacity-90 font-medium">
                    Hint: {wordData?.hint || "No hint available"}
                  </div>
                </>
              ) : (
                <>
                  <div className="text-sm text-gray-500 uppercase tracking-widest mb-1">
                    Your Word
                  </div>
                  <div className="text-4xl font-black text-primary leading-none">
                    {wordData?.word || "Error"}
                  </div>
                </>
              )}
            </div>
          ) : (
            <h1 className="text-6xl font-black text-gray-300">???</h1>
          )}
        </div>
      </div>

      <button
        onMouseDown={handleStart}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleStart}
        onTouchEnd={handleEnd}
        className={`w-full py-6 font-bold text-xl uppercase tracking-widest rounded-sm transition-all duration-100 shadow-md active:scale-95 touch-manipulation mb-10 ${
          isRevealed ? "bg-gray-800 text-white" : "bg-primary text-white"
        }`}
      >
        {isRevealed ? "REVEALING..." : "HOLD TO VIEW"}
      </button>

      {/* Action Buttons & Modals */}
      <div className="w-full flex flex-col gap-3">
        {/* Skip Modal */}
        {showSkipConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white p-6 w-full max-w-sm rounded-sm shadow-xl">
              <h3 className="text-xl font-bold text-primary mb-2">
                Skip Round?
              </h3>
              <p className="text-gray-600 mb-6">
                Pick a new word and restart round?
              </p>
              <div className="flex gap-3">
                <button
                  className="flex-1 bg-primary text-white py-3 font-bold rounded-sm hover:bg-red-700"
                  onClick={() => {
                    onSkip();
                    setShowSkipConfirm(false);
                  }}
                >
                  Yes
                </button>
                <button
                  className="flex-1 border border-gray-300 text-gray-600 py-3 font-bold rounded-sm hover:bg-gray-50"
                  onClick={() => setShowSkipConfirm(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Home Modal */}
        {showHomeConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white p-6 w-full max-w-sm rounded-sm shadow-xl">
              <h3 className="text-xl font-bold text-primary mb-2">
                Exit to Home?
              </h3>
              <p className="text-gray-600 mb-6">Game progress will be lost.</p>
              <div className="flex gap-3">
                <button
                  className="flex-1 bg-black text-white py-3 font-bold rounded-sm hover:bg-gray-800"
                  onClick={() => {
                    onHome();
                    setShowHomeConfirm(false);
                  }}
                >
                  Yes, Exit
                </button>
                <button
                  className="flex-1 border border-gray-300 text-gray-600 py-3 font-bold rounded-sm hover:bg-gray-50"
                  onClick={() => setShowHomeConfirm(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={onNext}
          className="w-full py-4 border-2 border-primary text-primary font-bold uppercase tracking-wider rounded-sm hover:bg-red-50 transition-colors"
        >
          Done / Next Player &gt;&gt;
        </button>

        <div className="flex gap-3">
          <button
            onClick={() => setShowSkipConfirm(true)}
            className="flex-1 py-3 text-sm font-bold text-gray-400 hover:text-primary transition-colors uppercase tracking-wide border border-transparent hover:border-gray-200 rounded-sm"
          >
            Skip Round
          </button>
          <button
            onClick={() => setShowHomeConfirm(true)}
            className="flex-1 py-3 text-sm font-bold text-gray-400 hover:text-primary transition-colors uppercase tracking-wide border border-transparent hover:border-gray-200 rounded-sm"
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default RevealScreen;
