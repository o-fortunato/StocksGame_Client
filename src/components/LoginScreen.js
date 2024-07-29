import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.min.css';

const socket = io('http://summercamp24.ddns.net:4000'); // Ensure this points to your server

function LoginScreen({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    setError(''); // Clear any previous errors

    try {
      // Step 1: Send POST request to register the player
      const response = await fetch('http://summercamp24.ddns.net:4000/game/register-player', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: username }),
      });

      if (!response.ok) {
        throw new Error('Failed to register player');
      }

      const data = await response.json();

      socket.emit('connectconfirm', { name: username });

      socket.once('connected', (data) => {
        setLoading(false);
        if (onLoginSuccess) {
          onLoginSuccess(data);
        }
      });

    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  useEffect(() => {
    // Cleanup listener on component unmount
    return () => {
      socket.off('connected');
    };
  }, []);

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-primary">
      <div className="card p-4" style={{ width: '25rem' }}>
        <div className="card-body text-center">
          <h1 className="card-title">Login</h1>
          <p className="card-text">Please enter your username</p>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <button className="btn btn-success w-100" onClick={handleLogin} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;