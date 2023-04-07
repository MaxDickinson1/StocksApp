import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import Stocks from './components/Stocks';
import Cryptocurrency from './components/Cryptocurrency';
import Auth from './components/Auth';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/stocks" element={<Stocks />} />
          <Route path="/cryptocurrency" element={<Cryptocurrency />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;


