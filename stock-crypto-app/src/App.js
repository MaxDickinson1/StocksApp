import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import Cryptocurrency from "./components/Cryptocurrency";
import Auth from "./components/Auth";
import CoinDetail from "./components/CoinDetail";
import PrivateRoute from "./PrivateRoute";
import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Container>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/cryptocurrency" element={<Cryptocurrency />} />
            <Route path="/auth" element={<Auth />} />
            <PrivateRoute path="/coins/:id" component={CoinDetail} />
          </Routes>
        </Container>
      </AuthProvider>
    </Router>
  );
}

export default App;
