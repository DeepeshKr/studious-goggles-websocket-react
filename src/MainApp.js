import React, { useState } from 'react';

import { Container, Header } from 'semantic-ui-react'
import { Grid, } from 'semantic-ui-react'
import WebSocketComponent from "./WebSocket"
import ChatRooms from './ChatRoom';

function MainApp() {
  const [selectedChatRoom, setSelectedChatRoom] = useState(false)

  console.log(selectedChatRoom)
  return (
    <Container text>
      <Header sub>AI Chat Demo</Header>


      <Grid columns={2} celled='internally'>
        <Grid.Row>
          <Grid.Column floated='left' width={4}>
            <Header as='h3' block>
              Chat Rooms
            </Header>

            <ChatRooms
              setSelectedChatRoom={setSelectedChatRoom}
            />
          </Grid.Column>

          <Grid.Column floated='right'  width={12}>
            <Header as='h3' block>
              {selectedChatRoom ? `Room ${selectedChatRoom}` : "No Chat room selected"}
            </Header>
            {selectedChatRoom &&
              <WebSocketComponent
                selectedChatRoom={selectedChatRoom}
              />
            }
          </Grid.Column>

        </Grid.Row>

      </Grid>
    </Container>
  );
}

export default MainApp;
