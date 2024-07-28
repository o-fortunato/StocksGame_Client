import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.min.css';

const socket = io('http://localhost:4000'); // Ensure this points to your mock server

function WaitingScreen({ player }) {
  const navigate = useNavigate();

  useEffect(() => {
    console.log('WaitingScreen mounted, setting up socket listeners');

    socket.on('game-started', () => {
      console.log('Received game-started event');
      navigate('/game');
    });

    // Cleanup listener on component unmount
    return () => {
      console.log('Cleaning up socket listeners');
      socket.off('game-started');
    };
  }, [navigate]);

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-primary">
      <div className="card p-4" style={{ width: '25rem' }}>
        <div className="card-body text-center">
          <h1 className="card-title">Waiting for the Game to Start</h1>
          <p className="card-text">Hello, {player.name} (ID: {player.id})</p>
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WaitingScreen;
