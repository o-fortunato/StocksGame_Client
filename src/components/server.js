const axios = require('axios');
const chai = require('chai');
const expect = chai.expect;
const { Server } = require('socket.io');
const http = require('http');

const PORT = 4000;

let playerId;
let walletConfig;

// Register Player
const registerPlayer = async () => {
  const data = JSON.stringify({ name: "testing" });

  const registerConfig = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://summercamp24.ddns.net:4000/game/register-player',
    headers: { 'Content-Type': 'application/json' },
    data: data
  };

  try {
    const response = await axios.request(registerConfig);
    console.log(JSON.stringify(response.data));

    expect(response.data).to.be.an('object').that.has.property('name');
    expect(response.data).to.be.an('object').that.has.property('id');
    expect(response.data).to.be.an('object').that.has.property('netWorth');
    playerId = response.data.id;

    walletConfig = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `http://summercamp24.ddns.net:4000/game/player/${playerId}`,
      headers: {}
    };
  } catch (error) {
    console.log(error);
  }
};

// Get Wallet
const getWallet = async () => {
  try {
    const response = await axios.request(walletConfig);
    console.log(JSON.stringify(response.data));
  } catch (error) {
    console.log(error);
  }
};

// Leave Game
const leaveGame = async () => {
  const data = JSON.stringify({ id: `${playerId}` });

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://summercamp24.ddns.net:4000/game/leave',
    headers: { 'Content-Type': 'application/json' },
    data: data
  };

  try {
    const response = await axios.request(config);
    console.log(JSON.stringify(response.data));
  } catch (error) {
    console.log(error);
  }
};

// Main function to handle the sequence
const main = async () => {
  await registerPlayer();
  await getWallet();
  await leaveGame();
};

// Setup Socket.IO server
const server = http.createServer();
const io = new Server(server, {
  cors: { origin: '*' }
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('login', async (data) => {
    await registerPlayer();
    socket.emit('login_success', { name: "testing", id: playerId });
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  // Other socket events (e.g., game_start) should be handled here
});

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});

main();
