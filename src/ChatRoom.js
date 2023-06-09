import React, { useEffect, useState } from 'react';

function ChatRooms({setSelectedChatRoom}) {
    
  const [chatRooms, setChatRooms] = useState([]);
  const [newChatRoomName, setNewChatRoomName] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:8000/chat-rooms')
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

    fetch(`http://127.0.0.1:8000/chat-rooms/${newChatRoomName}`, { method: 'POST' })
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
      <h2>List of Chat Rooms</h2>
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
        <button type="submit">Create Chat Room</button>
      </form>
    </div>
  );
}

export default ChatRooms;
