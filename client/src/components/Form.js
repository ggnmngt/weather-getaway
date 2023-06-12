import React, { useState } from 'react';
import './Form.css';

const Form = ({ onSearch }) => {
  const [startMonth, setStartMonth] = useState('');
  const [startDay, setStartDay] = useState('');
  const [endMonth, setEndMonth] = useState('');
  const [endDay, setEndDay] = useState('');
  const [minTemp, setMinTemp] = useState('');
  const [maxTemp, setMaxTemp] = useState('');

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform validation here
    if (!validateInputs()) {
        return;
    }

    // Prepare search data object
    const searchData = {
      startDate: `${startMonth}-${startDay}`,
      endDate: `${endMonth}-${endDay}`,
      minTemp,
      maxTemp,
    };
    // Pass search data to the parent component
    onSearch(searchData);
  };

  const validateInputs = () => {
    // Perform validation logic here
    // You can check the values of startDate, endDate, minTemp, maxTemp and return false if any validation condition fails
  
    return true; // Return true if all validation conditions pass
  };

  return (
    <div className="Form">
      <header className="Form-header">
        <h1 className="Form-title">City Search</h1>
        <form onSubmit={handleSubmit}>
          <div className="Form-row">
            <label htmlFor="start-month">Start Month:</label>
            <select
              id="start-month"
              value={startMonth}
              onChange={(e) => setStartMonth(e.target.value)}
              required
            >
              <option value="">Select Month</option>
              {months.map((month) => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
            <label htmlFor="start-day">Start Day:</label>
            <input
              type="text"
              id="start-day"
              value={startDay}
              onChange={(e) => setStartDay(e.target.value)}
              required
            />
          </div>
          <div className="Form-row">
            <label htmlFor="end-month">End Month:</label>
            <select
              id="end-month"
              value={endMonth}
              onChange={(e) => setEndMonth(e.target.value)}
              required
            >
              <option value="">Select Month</option>
              {months.map((month) => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
            <label htmlFor="end-day">End Day:</label>
            <input
              type="text"
              id="end-day"
              value={endDay}
              onChange={(e) => setEndDay(e.target.value)}
              required
            />
          </div>
          <div className="Form-row">
            <label htmlFor="min-temp">Min Temperature:</label>
            <input
              type="number"
              id="min-temp"
              value={minTemp}
              onChange={(e) => setMinTemp(e.target.value)}
              required
            />
          </div>
          <div className="Form-row">
            <label htmlFor="max-temp">Max Temperature:</label>
            <input
              type="number"
              id="max-temp"
              value={maxTemp}
              onChange={(e) => setMaxTemp(e.target.value)}
              required
            />
          </div>
          <button type="submit">Search</button>
        </form>
      </header>
    </div>
  );
};

export default Form;
