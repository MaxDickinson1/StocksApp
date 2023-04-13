import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Stocks = () => {
  const [stockData, setStockData] = useState(null);

  useEffect(() => {
    const fetchStockData = async () => {
      const options = {
        method: 'GET',
        url: 'https://alpha-vantage.p.rapidapi.com/query',
        params: {
          function: 'TIME_SERIES_INTRADAY',
          symbol: 'MSFT',
          interval: '5min',
          outputsize: 'compact',
          datatype: 'json',
        },
        headers: {
          'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
          'x-rapidapi-key': 'a36a60d052msh67fceb7ce73b8eap167b3ajsn75d5c133f825',
          useQueryString: true,
        },
      };

      try {
        const response = await axios.request(options);
        setStockData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStockData();
  }, []);

  return (
    <div>
      <h1>Stock Data</h1>
      {stockData && (
        <div>
          <h2>{stockData['Meta Data']['2. Symbol']}</h2>
          <ul>
            {Object.keys(stockData['Time Series (5min)']).map((timestamp) => (
              <li key={timestamp}>
                <strong>{timestamp}</strong>: {stockData['Time Series (5min)'][timestamp]['4. close']}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Stocks;





