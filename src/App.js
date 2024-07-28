import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginScreen from './components/LoginScreen';
import WaitingScreen from './components/WaitingScreen';
import StockGame from './stock_game';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [player, setPlayer] = useState(null);

  const handleLoginSuccess = (playerData) => {
    setPlayer(playerData);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={!player ? <LoginScreen onLoginSuccess={handleLoginSuccess} /> : <Navigate to="/waiting" />} />
          <Route path="/waiting" element={player ? <WaitingScreen player={player} /> : <Navigate to="/" />} />
          <Route path="/game" element={player ? <StockGame player={player} /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
