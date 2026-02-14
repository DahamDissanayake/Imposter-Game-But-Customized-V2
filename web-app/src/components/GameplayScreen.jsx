const GameplayScreen = ({ onReveal }) => {
  return (
    <div className="w-full max-w-md flex flex-col items-center justify-center animate-fade-in text-center p-6">
      <h1 className="text-5xl font-extrabold text-primary mb-6">
        Game Started!
      </h1>
      <p className="text-xl text-gray-700 mb-12 leading-relaxed">
        Ask questions freely.
        <br />
        <span className="font-bold">Find the imposter among you.</span>
      </p>
      <button
        onClick={onReveal}
        className="w-full py-5 bg-primary text-white text-xl font-bold uppercase tracking-widest hover:bg-red-700 transition-colors shadow-lg rounded-sm"
      >
        Reveal Imposters
      </button>
    </div>
  );
};

export default GameplayScreen;
