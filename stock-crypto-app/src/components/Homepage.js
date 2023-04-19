import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./Cryptocurrency.css";
import axiosInstance from "../axiosInstance";

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
          `http://localhost:5001/api/users/${userId}/favorites`
        );
        setFavorites(response.data);
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
        `http://localhost:5001/api/users/${userId}/favorites/${favoriteId}`
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
    <div className="coin-list">
      <h1 className="title">Your Favorites</h1>
      <input
        type="text"
        className="search-bar"
        placeholder="Search favorites"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="coin-grid">
        {filteredFavorites.length === 0 ? (
          <p>No favorites yet.</p>
        ) : (
          filteredFavorites.map((favorite) => (
            <div key={favorite._id} className="coin-card">
              <div className="coin-card-image">
                <img src={favorite.image} alt={`${favorite.name} logo`} />
              </div>
              <div className="coin-card-details">
                <h2
                  className="coin-name"
                  onClick={() => handleCoinClick(favorite.id)}
                >
                  {favorite.name}
                </h2>
                <p className="coin-symbol">
                  {favorite.symbol ? favorite.symbol.toUpperCase() : "N/A"}
                </p>
                <p className="coin-price">
                  {favorite.current_price
                    ? `$${favorite.current_price.toLocaleString()}`
                    : "N/A"}
                </p>
                {favorite.description && favorite.description.en && (
                  <p className="coin-description">{favorite.description.en}</p>
                )}
              </div>
              <button
                className="delete-button"
                onClick={() => handleDelete(favorite._id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Favorites;
