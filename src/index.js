const express = require('express');
const app = express();

app.use(express.json());


app.post('://summercamp24.ddns.net:4000', async (req, res) => {

});

app.post('/game/register-player', (req, res) => {
    // Payload: Only name
    // Response: PlayerDTO with name and ID
});
app.get('/game/player/{id}/wallet', (req, res) => {
    // Payload: ID of player
    // Response: PlayerDTO with the wallet and netWorth filled.
});
app.post('/game/leave/:id', (req, res) => {
    // Payload: PlayerDTO with ID filled
    // Response: N/A
});