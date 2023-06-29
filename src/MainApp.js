import React, { useState } from 'react';
import styled from 'styled-components';
import { Container } from 'semantic-ui-react'

import WebSocketComponent from "./webchat/WebSocket"
import ChatRooms from './webchat/ChatRoom';

import { Icon } from 'semantic-ui-react'

function MainApp() {
  const [selectedChatRoom, setSelectedChatRoom] = useState(false)
  const [topicCreated, setTopicCreated] = useState(false)

  return (
    <Container text>
      <Header>AI Chat Demo</Header>
      <PageContainer>
      <LeftColumn>
        <SubHeader>
              Topics
            </SubHeader>

            <ChatRooms
              selectedChatRoom={selectedChatRoom}
              setSelectedChatRoom={setSelectedChatRoom}
              topicCreated={topicCreated}
            />
      </LeftColumn>
      <RightColumn>
               <SubHeader>
              {selectedChatRoom ? `Topic ${selectedChatRoom}` : "No topic selected"}
            </SubHeader>
            <Icon loading size='big' name='circle notch' />
            
              <WebSocketComponent
                selectedChatRoom={selectedChatRoom}
                setSelectedChatRoom={setSelectedChatRoom}
                setTopicCreated={setTopicCreated}
              />
            
      </RightColumn>
      </PageContainer>

     
            
         
     
      
    </Container>
  );
}

export default MainApp;

const Header = styled.h1`
  text-align: center;
  font-size: 2rem;
  margin-top: 25px;
  margin-bottom: 25px;

`;

const SubHeader = styled.h1`
  text-align: center;
  font-size: 1.25rem;
  margin-bottom: 5px;

`;

const PageContainer = styled.div`
  display: grid;
  grid-template-columns: 25% auto;
  gap: 20px;
`;

const LeftColumn = styled.div`
  // background-color: lightgray;
`;

const RightColumn = styled.div`
  padding: 0px 10px;
`;