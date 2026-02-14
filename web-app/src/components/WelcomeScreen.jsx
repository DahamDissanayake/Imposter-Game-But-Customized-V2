import { useState } from "react";

const WelcomeScreen = ({ onStart, onReset }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="w-full max-w-md flex flex-col items-center justify-center space-y-12 animate-fade-in">
      <h1 className="text-6xl font-extrabold text-primary tracking-tighter">
        IMPOSTER
      </h1>

      <div className="flex flex-col gap-6 w-full">
        <button
          onClick={() => onStart("CATEGORIES")}
          className="w-full py-5 px-6 bg-primary text-white text-xl font-bold uppercase tracking-widest hover:bg-red-700 transition-colors duration-200 shadow-none border-none rounded-sm"
        >
          Preset Categories
        </button>

        <button
          onClick={() => onStart("CUSTOM")}
          className="w-full py-5 px-6 border-2 border-primary text-primary text-xl font-bold uppercase tracking-widest hover:bg-red-50 transition-colors duration-200 shadow-none rounded-sm"
        >
          Custom Words
        </button>

        <div className="mt-8 text-center">
          {showConfirm ? (
            <div className="bg-white border-2 border-primary p-6 rounded-sm w-full mx-auto shadow-none">
              <h3 className="text-primary text-lg font-bold mb-2">
                ERASE ALL DATA?
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                This cannot be undone.
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={onReset}
                  className="bg-primary text-white px-6 py-3 font-bold uppercase text-sm rounded-sm hover:bg-red-700"
                >
                  Confirm
                </button>
                <button
                  onClick={() => setShowConfirm(false)}
                  className="border border-gray-300 text-gray-500 px-6 py-3 font-bold uppercase text-sm rounded-sm hover:bg-gray-100"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowConfirm(true)}
              className="text-gray-400 text-xs uppercase tracking-wider font-semibold hover:text-primary transition-colors"
            >
              Reset Saved Data
            </button>
          )}
        </div>
      </div>

      <div className="mt-auto pt-8 text-xs text-gray-400">
        Design by <span className="font-bold text-gray-500">DAMA</span>
      </div>
    </div>
  );
};

export default WelcomeScreen;
