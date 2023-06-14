import logo from './../logo.svg';
import React, { useState } from 'react';
import './App.css';
import Form from './Form';
import Result from './Result';

function App() {
  const [showResult, setShowResult] = useState(false);
  const [cities, setCities] = useState([]);

  const handleSearch = (searchData) => {
    // Perform search based on the input values
    // You can add your logic here to fetch cities based on the date range and temperature range
    console.log('Search Data:', searchData);

    // Dummy data - replace with your actual search results
    const dummyCities = [
      { name: 'City A' },
      { name: 'City B' },
      { name: 'City C' },
    ];

    setCities(dummyCities);
    setShowResult(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather Getaway</h1>
      </header>
      <Form onSearch={handleSearch} />
      {showResult && <Result cities={cities} />}
    </div>
  );
}

export default App;
