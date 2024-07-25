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
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto mb-4">
                {messages.map((msg, index) => (
                    <div key={index} className="bg-gray-200 p-2 rounded mb-2">
                        {msg}
                    </div>
                ))}
            </div>
            <div className="flex">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="border rounded p-2 flex-1"
                />
                <button
                    onClick={handleSend}
                    className="bg-black text-white p-2 rounded ml-2"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatWindow;