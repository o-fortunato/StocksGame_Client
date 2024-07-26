import React from 'react';

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

export default Dashboard;