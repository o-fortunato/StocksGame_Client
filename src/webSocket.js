/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {config} from "chai";*/
//const WebSocket = require('ws');

const webSocket = new WebSocket('ws://summercamp24.ddns.net:4000');

//DTO Templates (Id currently NOT automatic -- needs change)

let TransactionDTO = {
    'playerId': "db3bb7de-ad8b-47f1-8ae4-7e7c09a16285", //For now, change as needed
    'stockId': "b04dd987-e5aa-48bd-88e4-ed4b36b8e823",
    'quantity': 10
}

let PlayerDTO = {
    "id": "a6cd5f0d-a0bc-4ad2-82ad-1133b9ea7a44", //For now, change as needed
    "name": "Orlando",
    "netWorth": 10000,
    "wallet": [],
    "chatMessages": []
}
let StockDTO = {
    "id": "",
    "company": "",
    "description": "",
    "symbol": "",
    "price": "",
}

let ChatMessageDTO = {
    "senderId": "a6cd5f0d-a0bc-4ad2-82ad-1133b9ea7a44", //For now, change as needed
    "receiverId": "all",
    "message": "oi"
}
//Use Test_Send to test data sent through Web Socket

let Test_Send = JSON.stringify({
    //See PDF for list of events
    "event": "send-message",
    "data": ChatMessageDTO,
})

webSocket.addEventListener('open', (event) => {
    console.log('[WebSocket] Connection established');
    webSocket.send(Test_Send);
});


webSocket.addEventListener('message', (event) => {
    console.log(`[WebSocket] Message received: ${event.data}`);
});

webSocket.addEventListener('close', (event) => {
    if (event.wasClean) {
        console.log(`[WebSocket] Connection closed cleanly, code=${event.code}, reason=${event.reason}`);
    } else {
        console.log('[WebSocket] Connection died');
    }
});

webSocket.addEventListener('error', (error) => {
    console.error('[WebSocket] Error:', error);
});

module.exports.webSocket = webSocket;
module.exports.TransactionDTO = TransactionDTO;
module.exports.PlayerDTO = PlayerDTO;
module.exports.StockDTO = StockDTO;
module.exports.ChatMessageDTO = ChatMessageDTO;
module.exports.Test_Send = Test_Send;