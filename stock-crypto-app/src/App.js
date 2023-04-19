import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route path="/cryptocurrency" component={Cryptocurrency} />
            <Route path="/auth" component={Auth} />
            <PrivateRoute path="/coins/:id" component={CoinDetail} />
          </Switch>
        </Container>
      </AuthProvider>
    </Router>
  );
}

export default App;
