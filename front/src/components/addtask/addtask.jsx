import React, { useState } from 'react';
import './addtask.css';

const AddTask = ({ isVisible, onClose, onSave }) => {
  const [name, setName] = useState('');

  const handleSave = () => {
    if(name !== '') {
      onSave(name);
      setName('');
      onClose();
    }
  };

  const handleCancel = () => {
    setName('');
    onClose(); 
  };

  if (!isVisible) return null;

  return (
    <div className="add-task add-task-container">
      <div className="popup-content">
        <button className="close-button" onClick={handleCancel}>X</button>
        <span className='title'>Enter Task Name</span>
        <input
          className='tn-inp'
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Task name..."
        />
        <div className="button-group">
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
