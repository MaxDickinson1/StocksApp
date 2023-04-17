import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import Stocks from './components/Stocks';
import Cryptocurrency from './components/Cryptocurrency';
import Auth from './components/Auth';
import CoinDetail from './components/CoinDetail'; 
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/cryptocurrency" element={<Cryptocurrency />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/coins/:id" element={<CoinDetail />} /> 
        </Routes>
      </Container>
    </Router>
  );
}


export default App;


