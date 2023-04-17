import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Cryptocurrency.css';
import useAuth from './useAuth';

const Cryptocurrency = () => {
  const [cryptocurrencies, setCryptocurrencies] = useState([]);
  const { token } = useAuth();

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

  const handleAddToFavorites = async (currency) => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const { user } = useAuth();
  
    try {
      await axios.put(
        `https://stark-chamber-73716.herokuapp.com/user/${user.id}/favorites`,
        { ...currency, timestamp: new Date().getTime() },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('Added to favorites:', currency.name);
      localStorage.setItem('favorites', JSON.stringify([...favorites, currency]));
    } catch (error) {
      console.error('Error adding to favorites:', error.message);
    }
  };
  
  

  return (
    <div className="coin-list">
      <h1 className="title">Cryptocurrencies</h1>
      <div className="coin-grid">
        {cryptocurrencies.map((currency) => (
          <div key={currency.id} className="coin-card">
            <div className="coin-card-image">
              <img src={currency.image} alt={`${currency.name} logo`} />
            </div>
            <div className="coin-card-details">
              <h2 className="coin-name">{currency.name}</h2>
              <p className="coin-symbol">{currency.symbol.toUpperCase()}</p>
              <p className="coin-price">${currency.current_price.toLocaleString()}</p>
              <button onClick={() => handleAddToFavorites(currency)}>Add to Favorites</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cryptocurrency;







