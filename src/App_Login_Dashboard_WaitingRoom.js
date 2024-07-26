import React, { useState } from 'react';
import Login from './login';
import Dashboard from './Dashboard';
import WaitingRoom from './WaitingRoom';

const AppLogin = () => {
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

export default AppLogin;