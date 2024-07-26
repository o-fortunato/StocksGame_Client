import React, { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import WaitingRoom from './components/WaitingRoom';

const App = () => {
  const [player, setPlayer] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);

  const handleLogin = (playerData) => {
    setPlayer(playerData);
  };

  const handleGameStart = () => {
    setGameStarted(true);
  };

  return (
    <div>
      {player ? (
        gameStarted ? (
          <Dashboard player={player} />
        ) : (
          <WaitingRoom player={player} onGameStart={handleGameStart} />
        )
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;