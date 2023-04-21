import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./HomePage.css";
import axiosInstance from "../axiosInstance";
import axios from "axios";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [search, setSearch] = useState("");
  const history = useHistory();

  useEffect(() => {
    const fetchFavorites = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("You must be logged in to view favorites");
        return;
      }

      try {
        const response = await axiosInstance.get(
          `https://stark-chamber-73716.herokuapp.com/api/users/${userId}/favorites`
        );
        const favoritesWithImages = await Promise.all(
          response.data.map(async (favorite) => {
            try {
              const coinGeckoResponse = await axios.get(
                `https://api.coingecko.com/api/v3/coins/${favorite.id}`
              );
              return {
                ...favorite,
                image: coinGeckoResponse.data.image.large,
              };
            } catch (error) {
              console.error(
                "Error fetching image from CoinGecko:",
                error.message
              );
              return favorite;
            }
          })
        );
        setFavorites(favoritesWithImages);
      } catch (error) {
        console.error("Error fetching favorites:", error.message);
        alert("Error fetching favorites. Please try again.");
      }
    };

    fetchFavorites();
  }, []);

  const handleCoinClick = (id) => {
    history.push(`/coins/${id}`);
  };

  const handleDelete = async (favoriteId) => {
    const userId = localStorage.getItem("userId");
    try {
      await axiosInstance.delete(
        `https://stark-chamber-73716.herokuapp.com/api/users/${userId}/favorites/${favoriteId}`
      );
      setFavorites(favorites.filter((favorite) => favorite._id !== favoriteId));
    } catch (error) {
      console.error("Error deleting favorite:", error.message);
      alert("Error deleting favorite. Please try again.");
    }
  };

  const filteredFavorites = favorites.filter(
    (favorite) =>
      favorite.name &&
      favorite.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="favorites-container">
      <h1 className="title">Your Favorites</h1>
      <input
        type="text"
        className="search-bar coin-search-bar"
        placeholder="Search favorites"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="favorites-grid">
        {filteredFavorites.length === 0 ? (
          <p>No favorites yet.</p>
        ) : (
          filteredFavorites.map((favorite) => (
            <div
              key={favorite._id}
              className="favorite-card"
              onClick={() => handleCoinClick(favorite.id)}
            >
              <div className="favorite-card-image">
                <img src={favorite.image} alt={`${favorite.name} logo`} />
              </div>
              <div className="favorite-card-details">
                <h2 className="favorite-name">{favorite.name}</h2>
                <p className="favorite-symbol">
                  {favorite.symbol ? favorite.symbol.toUpperCase() : "N/A"}
                </p>
                <p className="favorite-price">
                  {favorite.current_price
                    ? `$${favorite.current_price.toLocaleString()}`
                    : "N/A"}
                </p>
              </div>
              <button
                className="delete-button"
                onClick={(e) => {
                  e.stopPropagation(); 
                  handleDelete(favorite._id);
                }}
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Favorites;
