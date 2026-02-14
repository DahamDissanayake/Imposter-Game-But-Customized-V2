import { useState } from "react";
import wordsData from "../Words-and-hits.json";

const CategorySelection = ({ onConfirm, onBack }) => {
  const [selectedCats, setSelectedCats] = useState([]);

  const categories = Object.keys(wordsData);

  const toggleCat = (cat) => {
    if (selectedCats.includes(cat)) {
      setSelectedCats(selectedCats.filter((c) => c !== cat));
    } else {
      setSelectedCats([...selectedCats, cat]);
    }
  };

  const handleConfirm = () => {
    if (selectedCats.length === 0) return alert("Select at least one category");

    // Merge words from selected categories
    let pool = [];
    selectedCats.forEach((cat) => {
      pool = [...pool, ...wordsData[cat]];
    });

    onConfirm(pool);
  };

  return (
    <div className="w-full max-w-lg flex flex-col gap-6 animate-fade-in pb-8 h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 transition-colors shadow-none"
        >
          ←
        </button>
        <h2 className="text-2xl font-bold uppercase tracking-wider text-primary">
          Categories
        </h2>
        <div className="w-10" />
      </div>

      <div className="bg-white p-6 border border-gray-200 rounded-sm flex flex-col max-h-[70vh]">
        <div className="flex flex-wrap gap-2 overflow-y-auto custom-scrollbar flex-grow p-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => toggleCat(cat)}
              className={`px-3 py-2 text-sm font-bold uppercase tracking-wide rounded-sm border-2 transition-all shadow-none h-auto min-h-[40px] ${
                selectedCats.includes(cat)
                  ? "bg-primary border-primary text-white"
                  : "bg-white border-gray-200 text-gray-500 hover:border-gray-400"
              }`}
            >
              {cat.replace("_", " ")}
            </button>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-100">
          <p className="text-sm text-gray-500 mb-4">
            {selectedCats.length} categories selected
          </p>
          <button
            onClick={handleConfirm}
            className="w-full py-5 bg-primary text-white text-xl font-bold uppercase tracking-widest hover:bg-red-700 transition-colors shadow-none rounded-sm"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategorySelection;
