import React from 'react';
import './Result.css';

const Result = ({ cities }) => {
  return (
    <div className="Result">
      <header className="Result-header">
        <h1 className="Result-title">City Search Results</h1>
        <div className="Result-list">
          {cities.map((city, index) => (
            <div key={index} className="Result-item">
              <span className="Result-label">City:</span>
              <span className="Result-value">{city.name}</span>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
};

export default Result;
