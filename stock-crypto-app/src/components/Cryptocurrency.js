import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './Cryptocurrency.css';

const Cryptocurrency = () => {
  const [cryptocurrencies, setCryptocurrencies] = useState([]);
  const history = useHistory();

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

  const handleCardClick = (currency) => {
    history.push(`/coins/${currency.id}`);
  };

  return (
    <div className="coin-list">
      <h1 className="title">Cryptocurrencies</h1>
      <div className="coin-grid">
        {cryptocurrencies.map((currency) => (
          <div key={currency.id} className="coin-card" onClick={() => handleCardClick(currency)}>
            <div className="coin-card-image">
              <img src={currency.image} alt={`${currency.name} logo`} />
            </div>
            <div className="coin-card-details">
              <h2 className="coin-name">{currency.name}</h2>
              <p className="coin-symbol">{currency.symbol.toUpperCase()}</p>
              <p className="coin-price">${currency.current_price.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cryptocurrency;








