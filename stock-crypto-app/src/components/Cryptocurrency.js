import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Cryptocurrency.css';

const Cryptocurrency = () => {
  const [cryptocurrencies, setCryptocurrencies] = useState([]);

  useEffect(() => {
    const fetchCryptocurrencies = async () => {
      const vs_currency = 'usd'; 

      const options = {
        method: 'GET',
        url: 'https://api.coingecko.com/api/v3/coins/markets',
        params: { vs_currency },
      };

      try {
        const response = await axios.request(options);
        setCryptocurrencies(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCryptocurrencies();
  }, []);

  return (
    <div>
      <h1>Cryptocurrencies</h1>
      <div className="card-container">
        {cryptocurrencies.map((currency) => (
          <div className="card" key={currency.id}>
            <img src={currency.image} alt={currency.name} />
            <div className="card-body">
              <h2>{currency.name} ({currency.symbol.toUpperCase()})</h2>
              <p>Price: {currency.current_price} {currency.symbol.toUpperCase()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cryptocurrency;


