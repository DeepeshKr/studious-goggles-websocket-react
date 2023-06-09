import React, { useEffect, useState } from 'react';

function WebSocketComponent({selectedChatRoom}) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [ws, setWebSocket] = useState(null);

  useEffect(() => {
    const newWebSocket = new WebSocket(`ws://localhost:8000/ws/${selectedChatRoom}`);
    
    newWebSocket.onopen = () => {
      console.log('WebSocket connection established.');
      setWebSocket(newWebSocket);
    };

    newWebSocket.onmessage = event => {
      setMessages(prevMessages => [...prevMessages, event.data]);
    };

    // Clean up the WebSocket connection on component unmount
    return () => {
      if (ws) {
        ws.close();
      }
    };
    // eslint-disable-next-line
  }, [selectedChatRoom]);

  const sendMessage = event => {
    event.preventDefault();
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(inputValue);
      setInputValue('');
    } else {
      console.log('WebSocket connection not open.');
    }
  };

  return (
    <div>
      <ul id="messages">
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          id="messageText"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default WebSocketComponent;
