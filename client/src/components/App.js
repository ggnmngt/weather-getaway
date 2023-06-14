import React, { useState } from 'react';
import Form from './Form';
import Result from './Result';
import { SERVER_URL } from './config';

const App = () => {
  const [cities, setCities] = useState([]);

  const handleSearch = async (searchData) => {
    const { month, minTemp, maxTemp } = searchData;

    // Calculate the average temperature
    const temperature = (parseFloat(minTemp) + parseFloat(maxTemp)) / 2;

    try {
      const response = await fetch(`${SERVER_URL}/api/cities/search?month=${month}&temperature=${temperature}`);

      if (!response.ok) {
        throw new Error('Failed to fetch cities');
      }

      const data = await response.json();
      console.log(data);
      setCities(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <Form onSearch={handleSearch} />
      <Result cities={cities} />
    </div>
  );
};

export default App;
