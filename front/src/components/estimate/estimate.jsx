import React, { useState } from 'react';
import './estimate.css';

const Estimate = ({ isVisible, onClose, onSave,onRemove }) => {
  const [value, setvalue] = useState('');

  const handleInputChange = (e) => {
    setvalue(e.target.value);
  };

  const handleButtonClick = (value) => {
    setvalue(value);
  };

  const predefinedPoints = [1, 2, 3, 5, 8, 13, 21];

  if (!isVisible) return null;

  return (
    <div className="story-points">
      <div className="header">
        <h5>Set Story Points</h5>
        <button className="close-button" onClick={onClose}>X</button>
      </div>
      <input
        type="number"
        value={value}
        onChange={handleInputChange}
        placeholder="Enter points"
      />
      <div className="buttons">
        {predefinedPoints.map((point) => (
          <button
            key={point}
            onClick={() => handleButtonClick(point)}
            className={value == point ? 'selected' : ''}
          >
            {point}
          </button>
        ))}
      </div>
      <div className="footer">
        <button className="save-button" onClick={()=>{onSave(value)}}>Save</button>
        <button className="remove-button" onClick={onRemove}>Remove</button>
      </div>
    </div>
  );
};

export default Estimate;
