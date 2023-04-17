import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Row, Col } from 'react-bootstrap';

const Homepage = () => {
  const [favorites, setFavorites] = useState([]);
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!userId || !token) return;

    const fetchFavorites = async () => {
      try {
        const response = await axios.get(`https://stark-chamber-73716.herokuapp.com/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavorites(response.data.favorites);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFavorites();
  }, [userId, token]);

  return (
    <div>
      <h1>Your Favorites</h1>
      <Row>
        {favorites.map((favorite, index) => (
          <Col key={index} md={4}>
            <Card>
              <Card.Body>
                <Card.Title>{favorite.name} ({favorite.symbol})</Card.Title>
                <Card.Text>Price: {favorite.price}</Card.Text>
                <Card.Text>Change: {favorite.change}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Homepage;


