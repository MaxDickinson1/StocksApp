import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StockPrices = () => {
  const [stockPrices, setStockPrices] = useState([]);

  useEffect(() => {
    const fetchStockPrices = async () => {
      const options = {
        method: 'GET',
        url: 'https://eod-historical-data.p.rapidapi.com/intraday/AAPL.US',
        params: {
          interval: '1h',
          fmt: 'json',
          from: '1564752900',
          to: '1564753200'
        },
        headers: {
          'X-RapidAPI-Key': 'a36a60d052msh67fceb7ce73b8eap167b3ajsn75d5c133f825',
          'X-RapidAPI-Host': 'eod-historical-data.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        setStockPrices(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStockPrices();
  }, []);

  return (
    <div>
      <h1>Stock Prices</h1>
      <ul>
        {stockPrices && stockPrices.map((price) => (
          <li key={price.date}>
            Date: {price.date}, Open: {price.open}, High: {price.high}, Low: {price.low}, Close: {price.close}, Volume: {price.volume}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StockPrices;

