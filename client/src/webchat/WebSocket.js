import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import ProgressBar from './ProgressBar'; // Import the ProgressBar component


import {
  SAGA_START_AND_MESSAGE_WEBSOCKET,
  SAGA_CONNECT_WEBSOCKET,
  SAGA_MESSAGE_WEBSOCKET,
  // SAGA_DISCONNECT_WEBSOCKET

} from "../constants/actions";


function WebSocketComponent({ selectedChatRoom, setSelectedChatRoom, setTopicCreated }) {
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false)

  const { get_web_sock } = useSelector(
    (state) => ({
      get_web_sock: state.websock,

    }),
    shallowEqual
  );

  const token = "RANDOM-TOKEN"; // Replace with your actual authentication token

  useEffect(() => {

    if (!get_web_sock.ws) {
    if (selectedChatRoom) {
      dispatch({
        type: SAGA_CONNECT_WEBSOCKET,
        payload: { token, selectedChatRoom },
      });
    } 
  }
    // Reset messages when selectedChatRoom changes
    setMessages([]);

    // eslint-disable-next-line
  }, [selectedChatRoom, get_web_sock]);


  useEffect(() => {
    setMessages(get_web_sock.message);
    if (get_web_sock.ws) {
      setLoading(get_web_sock.pending)
    } else {
      setLoading(true)
    }

  }, [get_web_sock])

  console.log(get_web_sock)

  const sendMessage =  (event) => {
    event.preventDefault();
    if (!selectedChatRoom) {
      const name = inputValue
        .slice(0, 50)
        .toLowerCase()
        .replace(/ /g, '_')
        .replace(/[^a-zA-Z0-9_]/g, '');
  
      setSelectedChatRoom(name);
  
        dispatch({
          type: SAGA_START_AND_MESSAGE_WEBSOCKET,
          payload: { 
            token, 
            name, 
            message: {
                    id: uuidv4(),
                    message: inputValue,
                  } 
            },
        });
        setTopicCreated(Math.random())
    } else {

      if (get_web_sock.ws) {
        dispatch({
          type: SAGA_MESSAGE_WEBSOCKET,
          payload: {
            id: uuidv4(),
            message: inputValue,
          },
        });
      }

    }
  
    setInputValue('');
    
  };

  console.log(messages)
  return (
    <div>

<MessageList>
    {Object.values(messages).map((message) => {
        return (
            <MessageItem key={message?.id}>
                <MessageContent isuser="true">
                    <MessageSender>Me: </MessageSender>
                    {message?.message}
                </MessageContent>

                <MessageContent>
                    <MessageSender>Server: </MessageSender>
                    {message?.type === 'server_response' && message?.server?.response}
                    {message?.type === 'server_update' && <ProgressBar value={message.update} />}
                </MessageContent>
            </MessageItem>
        );
    })}
</MessageList>

      <form onSubmit={sendMessage}>
        <input
          type="text"
          id="messageText"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
        <button 
        disabled={selectedChatRoom ? loading : false} 
        
        type="submit">{selectedChatRoom ? "Send" : "Start"}</button>
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

 
  margin-bottom: 10px;
`;

const MessageContent = styled.div`
display: flex;
  background-color: ${props => (props.isuser ? '#eaf6ff' : '#f4f4f4')};
  justify-content: ${props => (props.isuser ? 'flex-start' : 'flex-end')};
  padding: 10px;
  border-radius: 5px;
  width: 100%;
`;

const MessageSender = styled.strong`
  margin-right: 5px;
`;