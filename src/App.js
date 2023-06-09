import React, { useState } from 'react';

import {
  Navbar,
  NavbarBrand
} from 'reactstrap';
import WebSocketComponent from "./WebSocket"
import ChatRooms from './ChatRoom';

function App() {
  const [selectedChatRoom, setSelectedChatRoom] = useState(false)
  console.log(selectedChatRoom)
  return (
    <>
      <Navbar color="light" light>
        <NavbarBrand href="/">Real-time document editor</NavbarBrand>
      </Navbar>
      <div className="container-fluid">
        <ChatRooms 
          setSelectedChatRoom={setSelectedChatRoom}
         />
        {selectedChatRoom &&
            <WebSocketComponent 
              selectedChatRoom={selectedChatRoom} 
            />  
        }
             </div>
    </>
  );
}

export default App;
