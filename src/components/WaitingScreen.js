import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.min.css';

const socket = io('http://localhost:4000'); // Ensure this points to your mock server or real server as needed

function WaitingScreen({ player }) {
  const [gameStarted, setGameStarted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on('game-started', () => {
      setGameStarted(true);
      navigate('/game');
    });

    // Cleanup listener on component unmount
    return () => {
      socket.off('game-started');
    };
  }, [navigate]);

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-primary">
      <div className="card p-4" style={{ width: '25rem' }}>
        <div className="card-body text-center">
          <h1 className="card-title">Waiting for the Game to Start</h1>
          <p className="card-text">Hello, {player.name} (ID: {player.id})</p>
          {!gameStarted ? (
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            <div>
              <h2>Game Started!</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default WaitingScreen;


