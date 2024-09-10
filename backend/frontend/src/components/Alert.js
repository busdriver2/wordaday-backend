import React from 'react';
import '../alert.css'; // Import the CSS file for styling

const Alert = ({ message, onClose }) => {
  return (
    <div className="custom-alert">
      <div className="custom-alert-content">
        <span>{message}</span>
        <button className="custom-alert-close" onClick={onClose}>×</button>
      </div>
    </div>
  );
};

export default Alert;
