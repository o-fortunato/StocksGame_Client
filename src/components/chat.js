import React, { useState } from 'react';

const ChatWindow = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (input.trim()) {
            setMessages([...messages, input]);
            setInput('');
        }
    };

    return (
        <div className="d-flex flex-column h-100">
            <div className="flex-grow-1 overflow-auto mb-3">
                {messages.map((msg, index) => (
                    <div key={index} className="mb-2 p-2 bg-light rounded">
                        {msg}
                    </div>
                ))}
            </div>
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
    );
};

export default ChatWindow;
