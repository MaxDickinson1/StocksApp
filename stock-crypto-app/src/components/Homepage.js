import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';


const Homepage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userIdFromStorage = localStorage.getItem('userId');
    if (userIdFromStorage) {
        axiosInstance.get(`http://localhost:5001/api/users/${userIdFromStorage}/favorites`)

        .then((response) => {
          setFavorites(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching favorites:', error.message);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <div>
      <h1>My Favorites</h1>
      {loading ? (
        <p>Loading...</p>
      ) : favorites.length ? (
        <ul>
          {favorites.map((favorite) => (
            <li key={favorite.id}>{favorite.title}</li>
          ))}
        </ul>
      ) : (
        <p>No favorites yet.</p>
      )}
    </div>
  );
};

export default Homepage;





