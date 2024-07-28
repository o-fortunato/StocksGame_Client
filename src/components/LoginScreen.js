import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.min.css';

const socket = io('http://localhost:4000'); // Ensure this points to your mock server or real server as needed

function LoginScreen({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    socket.emit('login', { name: username });
  };

  useEffect(() => {
    socket.on('login_success', (data) => {
      setLoading(false);
      if (onLoginSuccess) {
        onLoginSuccess(data);
      }
    });

    // Cleanup listener on component unmount
    return () => {
      socket.off('login_success');
    };
  }, [onLoginSuccess]);

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
          <button className="btn btn-success w-100" onClick={handleLogin} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
