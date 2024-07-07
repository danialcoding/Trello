import React, { useState } from 'react';
import './uploadimage.css'; 

const UploadImage = ({ isVisible, onClose, onSave }) => {
    const [image, setImage] = useState(null);
    const [tempImage, setTempImage] = useState(null);
  
    const handleImageChange = (e) => {
      if (e.target.files && e.target.files[0]) {
        setTempImage(URL.createObjectURL(e.target.files[0]));
      }
    };
  
    const handleSave = () => {
        setImage(tempImage);
        onSave(tempImage);
        setTempImage(null);
    };
  
    const handleCancel = () => {
        setTempImage(null);
    };
  

    if (!isVisible) return null;

    return (
      <div className="image-upload-container">
        <div className="image-upload-box">
          <input 
            type="file" 
            id="file-upload" 
            accept="image/*" 
            onChange={handleImageChange} 
          />
          <label htmlFor="file-upload" className="file-upload-label">
            {tempImage ? (
              <img src={tempImage} alt="Uploaded" className="uploaded-image" />
            ) : image ? (
              <img src={image} alt="Uploaded" className="uploaded-image" />
            ) : (
              <span>Click to upload an image</span>
            )}
          </label>
        </div>
        {tempImage && (
          <div className="button-container">
            <button className="save-button" onClick={handleSave}>Save</button>
            <button className="cancel-button" onClick={handleCancel}>Cancel</button>
          </div>
        )}
      </div>
    );
  };

export default UploadImage;
