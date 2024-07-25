

const webSocket = new WebSocket('ws://summercamp24.ddns.net:4000');

webSocket.addEventListener('open', (event) => {
    console.log('[WebSocket] Connection established');
});



webSocket.addEventListener('message', (event) => {
    webSocket.send(
        JSON.stringify(JSON.stringify(chatMessageDTO))
    );
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
