import { useContext, useState, useEffect } from 'react';
import UserContext from './UserContext';
import axios from 'axios';

const Favorites = () => {
  const { user } = useContext(UserContext);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(`https://stark-chamber-73716.herokuapp.com/user/${user.id}/favorites`);
        setFavorites(response.data);
      } catch (error) {
        console.error('Error fetching favorites:', error.message);
      }
    };

    if (user) {
      fetchFavorites();
    }
  }, [user]);

  const removeFromFavorites = async (favoriteId) => {
    try {
      await axios.delete(`https://stark-chamber-73716.herokuapp.com/user/${user.id}/favorites/${favoriteId}`);
      setFavorites(favorites.filter((favorite) => favorite.id !== favoriteId));
    } catch (error) {
      console.error('Error removing favorite:', error.message);
    }
  };

  if (!user) {
    return <p>You need to log in to see your favorites.</p>;
  }

  return (
    <div>
      <h1>Your Favorites</h1>
      {favorites.length === 0 ? (
        <p>You haven't added any favorites yet.</p>
      ) : (
        <ul>
          {favorites.map((favorite) => (
            <li key={favorite.id}>
              {favorite.title} ({favorite.year})
              <button onClick={() => removeFromFavorites(favorite.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favorites;







