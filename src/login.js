
import React, { useState } from 'react';
import axios from 'axios';

// Componente Login

const Login = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    // Verifica se o nome não está vazio. Se estiver, define uma mensagem de erro e retorna, abortando o processo de login.
    if (!name.trim()) {
      setError('Name is required');
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/game/register-player', { name });
      onLogin(response.data);
    } catch (error) {
      setError('Failed to register. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Register to Play</h2>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleLogin} style={styles.button} disabled={loading}>
        {loading ? 'Registering...' : 'Register'}
      </button>
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  input: {
    padding: '10px',
    margin: '10px 0',
    fontSize: '16px',
    width: '200px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
};



// Componente Dashboard
const Dashboard = ({ player }) => {
    return (
      <div>
        <h1>Welcome, {player.name}</h1>
        <p>Your player ID is: {player.id}</p>
        {/* You can add more components and functionality here */}
      </div>
    );
};


// Componente principal App
const App = () => {
    const [player, setPlayer] = useState(null);
  
    const handleLogin = (playerData) => {
      setPlayer(playerData);
    };
  
    return (
      <div>
        {player ? (
          <Dashboard player={player} />
        ) : (
          <Login onLogin={handleLogin} />
        )}
      </div>
    );
};
  
export default App;




