import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Cryptocurrency.css';
import useAuth from '../hooks/useAuth';

function Cryptocurrency({ currency }) {
  const { user, token } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (user && user.favorites.includes(currency.id)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [user, currency.id]);

  const handleAddToFavorites = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/favorites`,
        { currencyId: currency.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setIsFavorite(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveFromFavorites = async () => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/favorites/${currency.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setIsFavorite(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="cryptocurrency">
      <div className="cryptocurrency-name">
        {currency.name} ({currency.symbol.toUpperCase()})
      </div>
      <div className="cryptocurrency-price">${currency.price_usd}</div>
      {user ? (
        <div className="cryptocurrency-favorite">
          {isFavorite ? (
            <button onClick={handleRemoveFromFavorites}>Remove from Favorites</button>
          ) : (
            <button onClick={handleAddToFavorites}>Add to Favorites</button>
          )}
        </div>
      ) : (
        <div className="cryptocurrency-login">
          Please <a href="/login">log in</a> to add to favorites.
        </div>
      )}
    </div>
  );
}

export default Cryptocurrency;









