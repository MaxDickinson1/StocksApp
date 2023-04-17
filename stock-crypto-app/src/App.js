import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import Stocks from './components/Stocks';
import Cryptocurrency from './components/Cryptocurrency';
import Auth from './components/Auth';
import CoinDetail from './components/CoinDetail'; 
import './App.css';
import UserContext from './components/UserContext';

function App() {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Navbar />
        <Container>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/stocks" element={<Stocks />} />
            <Route path="/cryptocurrency" element={<Cryptocurrency />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/coins/:id" element={<CoinDetail />} /> 
          </Routes>
        </Container>
      </Router>
    </UserContext.Provider>
  );
}

export default App;



