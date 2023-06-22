import React, { useEffect, useState } from 'react';

// const API_SERVER = 'https://ml-stg-websocket.innerlogic.ca'
const API_SERVER = 'http://127.0.0.1:8000'

function ChatRooms({setSelectedChatRoom}) {
  

  const [chatRooms, setChatRooms] = useState([]);
  const [newChatRoomName, setNewChatRoomName] = useState('');

  useEffect(() => {
    fetch(`${API_SERVER}/chat-rooms`)
      .then(response => response.json())
      .then(data => {
        setChatRooms(data.chat_rooms);
      })
      .catch(error => {
        console.log('Error retrieving chat rooms:', error);
      });
  }, []);

  const createChatRoom = event => {
    event.preventDefault();

    if (newChatRoomName.trim() === '') {
      return;
    }

    fetch(`${API_SERVER}/chat-rooms/${newChatRoomName}`, { method: 'POST' })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'Chat room created successfully.') {
          setChatRooms(prevChatRooms => [...prevChatRooms, newChatRoomName]);
          setNewChatRoomName('');
        } else {
          console.log('Error creating chat room:', data.message);
        }
      })
      .catch(error => {
        console.log('Error creating chat room:', error);
      });
  };

  function ClickedOneChat(e) {
    // console.log(e)
    setSelectedChatRoom(e)
  }


  return (
    <div>
   
      <ul>
        {chatRooms.map(chatRoom => (
          <li key={chatRoom} onClick={() => ClickedOneChat(chatRoom)} >{chatRoom}</li>
        ))}
      </ul>
      <form onSubmit={createChatRoom}>
        <input
          type="text"
          value={newChatRoomName}
          onChange={event => setNewChatRoomName(event.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default ChatRooms;
