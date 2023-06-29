import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector, shallowEqual, useDispatch } from "react-redux";

import {
  SG_FETCH_CHAT_ROOM,
  // SG_CREATE_CHAT_ROOM

} from "../constants/actions";

function ChatRooms({selectedChatRoom, setSelectedChatRoom, topicCreated}) {
  const dispatch = useDispatch();

  const [chatRooms, setChatRooms] = useState([]);
  // const [newChatRoomName, setNewChatRoomName] = useState('');

  useEffect(() => {
    
      dispatch({
        type: SG_FETCH_CHAT_ROOM,

      });
    
  }, [dispatch, topicCreated]);

  const { get_chat_rooms } = useSelector(
      (state) => ({
        get_chat_rooms: state.data,
        
      }),
      shallowEqual
    );


  useEffect(() => {
    setChatRooms(get_chat_rooms?.chat_rooms)
    }, [get_chat_rooms]);

  // const createChatRoom = event => {
  //   event.preventDefault();

  //   if (newChatRoomName.trim() === '') {
  //     return;
  //   }
  //   dispatch({
  //     type: SG_CREATE_CHAT_ROOM,
  //     payload:  {chat_room: newChatRoomName}

  //   });

  // };

  function ClickedOneChat(e) {
    // console.log(e)
    setSelectedChatRoom(e)
  }

// selectedChatRoom
  return (
    <div>
   
   <ListContainer>
    {chatRooms.map(chatRoom => (
      <ListItem key={chatRoom} onClick={() => ClickedOneChat(chatRoom)}>
        {chatRoom}
      </ListItem>
    ))}
  </ListContainer>
      {/* <form onSubmit={createChatRoom}>
        <input
          type="text"
          value={newChatRoomName}
          onChange={event => setNewChatRoomName(event.target.value)}
        />
        <button type="submit">Add</button>
      </form> */}
    </div>
  );
}

export default ChatRooms;

// Styled component for the <ul> element
const ListContainer = styled.ul`
  list-style-type: none;
`;

// Styled component for the <li> element
const ListItem = styled.li`
  padding: 10px;
  background-color: #f4f4f4;

  &:hover {
    background-color: #eaf6ff;
    cursor: pointer;
  }
`;
