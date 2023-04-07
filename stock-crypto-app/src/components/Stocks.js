import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Stocks = () => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const fetchStocks = async () => {
      const options = {
        method: 'GET',
        url: 'https://financialmodelingprep.com/api/v3/stock/list',
      };

      try {
        const response = await axios.request(options);
        setStocks(response.data.symbolsList);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStocks();
  }, []);

  return (
    <div style={{ height: '400px', overflowY: 'scroll' }}>
      <h1>Stocks</h1>
      <ul>
        {stocks && stocks.map((stock) => (
          <li key={stock.symbol}>
            {stock.name} ({stock.symbol})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Stocks;
