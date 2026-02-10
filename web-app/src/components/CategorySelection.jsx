import { useState } from 'react';
import wordsData from '../Words-and-hits.json';

const CategorySelection = ({ onConfirm, onBack }) => {
  const [selectedCats, setSelectedCats] = useState([]);

  const categories = Object.keys(wordsData);

  const toggleCat = (cat) => {
    if (selectedCats.includes(cat)) {
      setSelectedCats(selectedCats.filter(c => c !== cat));
    } else {
      setSelectedCats([...selectedCats, cat]);
    }
  };

  const handleConfirm = () => {
    if (selectedCats.length === 0) return alert("Select at least one category");
    
    // Merge words from selected categories
    let pool = [];
    selectedCats.forEach(cat => {
      pool = [...pool, ...wordsData[cat]];
    });
    
    onConfirm(pool);
  };


  return (
    <div className="center-content" style={{ justifyContent: 'flex-start', paddingTop: 'env(safe-area-inset-top)', width: '100%', maxWidth: '600px', boxSizing: 'border-box' }}>
      
      {/* Header with aligned Back Arrow */}
      <div style={{ 
        width: '90%', 
        display: 'grid', 
        gridTemplateColumns: '40px 1fr 40px', 
        alignItems: 'center', 
        marginBottom: '20px',
        marginTop: '20px'
      }}>
        <button 
          onClick={onBack}
          style={{ 
            width: '40px', 
            height: '40px', 
            padding: 0, 
            borderRadius: '50%', 
            fontSize: '1.2rem', 
            marginBottom: 0, 
            background: 'rgba(255,255,255,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          ←
        </button>
        <h2 style={{ margin: 0, textAlign: 'center' }}>Categories</h2>
        <div /> {/* Spacer */}
      </div>

      <div className="glass-panel" style={{ width: '90%', margin: '0 0 16px 0', display: 'flex', flexDirection: 'column', maxHeight: '70vh' }}>
        <div className="player-list" style={{ overflowY: 'auto', margin: '10px 0', flexGrow: 1 }}>
          {categories.map(cat => (
            <button 
              key={cat} 
              onClick={() => toggleCat(cat)}
              style={{ 
                width: 'auto', 
                margin: '5px',
                background: selectedCats.includes(cat) ? 'var(--accent-color)' : 'rgba(255,255,255,0.1)',
                color: selectedCats.includes(cat) ? '#000' : 'white',
                border: '1px solid rgba(255,255,255,0.2)'
              }}
            >
              {cat.replace('_', ' ').toUpperCase()}
            </button>
          ))}
        </div>
        
        <div style={{ marginTop: '20px', width: '100%', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
          <p style={{marginBottom: '10px'}}>{selectedCats.length} categories selected</p>
          <button onClick={handleConfirm} style={{ marginBottom: 0 }}>Confirm Selection</button>
        </div>
      </div>
    </div>
  );
};

export default CategorySelection;
