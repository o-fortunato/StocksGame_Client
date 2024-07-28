import React, { useState } from 'react';
//import * as WebSocketFunc from '../webSocket';

const ChatWindow = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    let Test_Send = JSON.stringify({
        //See PDF for list of events
        "event": "send-message",
        "data": {
            "senderId": "a6cd5f0d-a0bc-4ad2-82ad-1133b9ea7a44",
            "receiverId": "all",
            "message": `${input}`
        }, //For now, change as needed
    })

    const handleSend = () => {
        if (input.trim()) {
            setMessages([...messages, input]);
            setInput('');
            //WebSocketFunc.webSocket.send(Test_Send)
        }
    };

    return (
        <div className="d-flex flex-column h-100">
            <div className="flex-grow-1 overflow-auto p-2 bg-light">
                {messages.map((msg, index) => (
                    <div key={index} className="mb-2 p-2 bg-white rounded shadow-sm">
                        {msg}
                    </div>
                ))}
            </div>
            <div className="border-top p-2 bg-light">
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button className="btn btn-primary" onClick={handleSend}>
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatWindow;
