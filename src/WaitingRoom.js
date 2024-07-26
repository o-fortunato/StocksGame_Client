import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const WaitingRoom = ({ player, onGameStart }) => {
  const [waitingMessage, setWaitingMessage] = useState('Waiting for the game to start...');
  const socket = io('http://localhost:5000'); // Ajuste o endereço conforme necessário

  // useEffect => para conectar ao servidor de WebSocket quando o componente é montado
  useEffect(() => {
    // Conectar ao servidor de WebSocket
    socket.on('connect', () => {
      console.log('Connected to the WebSocket server');

      // Notificar o servidor que o jogador está esperando
      socket.emit('player-waiting', player);
    });

    // Receber a notificação de que o jogo começou
    socket.on('game-started', () => {
      onGameStart();
    });

    // Limpar o evento ao desmontar o componente
    return () => {
      socket.disconnect();
    };
  }, [socket, player, onGameStart]);

  return (
    <div style={styles.container}>
      <h2>{waitingMessage}</h2>
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
};

export default WaitingRoom;