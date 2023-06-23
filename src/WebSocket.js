import React, { useEffect, useState } from 'react';
import styled from 'styled-components';


function WebSocketComponent({ selectedChatRoom }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [ws, setWebSocket] = useState(null);

  const token = "RANDOM-TOKEN"; // Replace with your actual authentication token

  useEffect(() => {
    const newWebSocket = new WebSocket(`ws://localhost:8000/ws-1/${token}/${selectedChatRoom}`);
    // const newWebSocket = new WebSocket(`wss://ml-stg-websocket.innerlogic.ca/ws/${selectedChatRoom}`);

    newWebSocket.onopen = () => {
      console.log('WebSocket connection established.');
      setWebSocket(newWebSocket);
    };

    newWebSocket.onmessage = event => {
      // setMessages(prevMessages => [...prevMessages, event.data]);
      setMessages(prevMessages => [...prevMessages, { sender: "server", message: event.data }]);

    };
    

    // Reset messages when selectedChatRoom changes
    setMessages([]);

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
      const message = inputValue;
      ws.send(message,);
      setMessages(prevMessages => [...prevMessages, { sender: "me", message: message }]);

      setInputValue('');
    } else {
      console.log('WebSocket connection not open.');
    }
  };

  console.log(messages)
  return (
    <div>
   <MessageList>
        {messages.map((message, index) => (
          <MessageItem key={index} isuser={message.sender === 'me'? "true" : "false"}>
            <MessageContent isuser={message.sender === 'me' ? "true": "false"}>
              <MessageSender>{message.sender}: </MessageSender>
              {message.message}
            </MessageContent>
          </MessageItem>
        ))}
      </MessageList>
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

const MessageList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const MessageItem = styled.li`
  display: flex;
  justify-content: ${props => (props.isuser ? 'flex-end' : 'flex-start')};
  margin-bottom: 10px;
`;

const MessageContent = styled.div`
  background-color: ${props => (props.isuser ? '#eaf6ff' : '#f4f4f4')};
  padding: 10px;
  border-radius: 5px;
`;

const MessageSender = styled.strong`
  margin-right: 5px;
`;