import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Cryptocurrency.css';

const HomePage = ({ userId }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const token = localStorage.getItem('token');
      const favorites = user && user.favorites ? user.favorites : [];
      console.log('userIdFromStorage:', userIdFromStorage);
      try {
        const response = await axios.get(
          `https://stark-chamber-73716.herokuapp.com/user/${userIdFromStorage}/favorites`, 
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log('Favorites fetched:', response.data);
        setFavorites(response.data);
      } catch (error) {
        console.error('Error fetching favorites:', error.message);
      }
    };
  
    if (localStorage.getItem('token')) {
      fetchFavorites();
    }
  }, []);
  

  return (
    <div className="coin-list">
      <h1 className="title">Favorites</h1>
      <div className="coin-grid">
        {favorites.map((favorite) => (
          <div key={`${favorite.type}-${favorite.symbol}`} className="coin-card">
            <div className="coin-card-details">
              <h2 className="coin-name">{favorite.name}</h2>
              <p className="coin-symbol">{favorite.symbol.toUpperCase()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;




