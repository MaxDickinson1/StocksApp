import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';

const AddFavorites = ({ userId, token, onSuccess }) => {
  const [symbol, setSymbol] = useState('');
  const [type, setType] = useState('stock');
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      type,
      symbol,
      name,
    };

    try {
      await axios.put(`https://stark-chamber-73716.herokuapp.com/users/${userId}/favorites`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSymbol('');
      setType('stock');
      setName('');

      onSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h3>Add Favorite</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Type:</Form.Label>
          <Form.Control as="select" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="stock">Stock</option>
            <option value="crypto">Cryptocurrency</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Symbol:</Form.Label>
          <Form.Control type="text" value={symbol} onChange={(e) => setSymbol(e.target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Name:</Form.Label>
          <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add
        </Button>
      </Form>
    </div>
  );
};

export default AddFavorites;


