import { all, takeLatest, call, put, take, select } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import {
    PENDING_WEBSOCKET,
    SAGA_CONNECT_WEBSOCKET,
    CONNECT_WEBSOCKET,
    SAGA_MESSAGE_WEBSOCKET,
    MESSAGE_WEBSOCKET,
    SAGA_START_AND_MESSAGE_WEBSOCKET,
    DISCONNECT_WEBSOCKET,
    ERROR_WEBSOCKET
} from '../constants/actions';



function* establishWebSocketSaga(action) {
    const { token, selectedChatRoom } = action.payload;
    const url = `ws://localhost:8000/ws-1/${token}/${selectedChatRoom}`;
    const ws = new WebSocket(url);
  
    yield new Promise(resolve => {
        ws.onopen = resolve;
      });
  
    yield put({ type: CONNECT_WEBSOCKET, payload: ws });
  }

function* establishWebSocket() {
    yield takeLatest(SAGA_CONNECT_WEBSOCKET, establishWebSocketSaga);
}



function createWebSocketChannel(ws) {
    return eventChannel(emit => {
      const messageHandler = event => {
        // Assuming you receive the response message from the server
        emit({ type: MESSAGE_WEBSOCKET, payload: JSON.parse(event.data)  });
      };
  
        const closeHandler = () => {
            // Handle WebSocket disconnection
            emit({ type: DISCONNECT_WEBSOCKET });
        };

        const errorHandler = error => {
            // Handle WebSocket errors
            emit({ type: ERROR_WEBSOCKET, payload: error });
        };

        // Add event listener for 'message' event
        ws.addEventListener('message', messageHandler);
  
        // Add event listener for 'close' event
        ws.addEventListener('close', closeHandler);

        // Add event listener for 'error' event
        ws.addEventListener('error', errorHandler);


        // Return the unsubscribe function
        return () => {
        // Clean up the event listeners when the channel is unsubscribed
        ws.removeEventListener('message', messageHandler);
        ws.removeEventListener('close', closeHandler);
        ws.removeEventListener('error', errorHandler);
        };
    });
  }
  
  function* handleSendMessage(action) {
    const { payload: message } = action;

    // Dispatch the client message
    yield put({ type: MESSAGE_WEBSOCKET, payload:  message });
    yield put({ type: PENDING_WEBSOCKET });

    // Access the WebSocket instance from the Redux store
    const ws = yield select(state => state.websock.ws);
  
    if (ws && ws.readyState === WebSocket.OPEN) {
      // Create a WebSocket channel to capture the server responses
      const channel = yield call(createWebSocketChannel, ws);
      // Send the message
      ws.send(JSON.stringify(message));
  
      // Listen for server responses
      while (true) {
        // Wait for the response from the WebSocket channel
        const responseAction = yield take(channel);
        
        // Dispatch the server response
        yield put(responseAction);
      }
    } else {
      console.log('WebSocket connection not open.');
      yield put({ type: DISCONNECT_WEBSOCKET, payload: false });
    }
  }
  
  // Watcher Saga
  function* watchSendMessage() {
    yield takeLatest(SAGA_MESSAGE_WEBSOCKET, handleSendMessage);
  }



  function* handleStartandSendMessage(action) {

    const { token, name, message } = action.payload;
    const url = `ws://localhost:8000/ws-1/${token}/${name}`;
    const ws = new WebSocket(url);

      // Dispatch the client message
    yield put({ type: MESSAGE_WEBSOCKET, payload:  message });

    yield new Promise(resolve => {
        ws.onopen = resolve;
      });
  
    yield put({ type: CONNECT_WEBSOCKET, payload: ws });


    yield put({ type: PENDING_WEBSOCKET });

    // Access the WebSocket instance from the Redux store
    // const ws = yield select(state => state.websock.ws);
  
    if (ws && ws.readyState === WebSocket.OPEN) {
      // Create a WebSocket channel to capture the server responses
      const channel = yield call(createWebSocketChannel, ws);

      // console.log("Send the message", message)
      // Send the message
      ws.send(JSON.stringify(message));
  
      // Listen for server responses
      while (true) {
        // Wait for the response from the WebSocket channel
        const responseAction = yield take(channel);

        // Dispatch the server response
        yield put(responseAction);
      }
    } else {
      console.log('WebSocket connection not open.');
      yield put({ type: DISCONNECT_WEBSOCKET, payload: false });
    }
  }
  // Watcher Saga
  function* watchStartAndSendMessage() {
    yield takeLatest(SAGA_START_AND_MESSAGE_WEBSOCKET, handleStartandSendMessage);
  }

export default function* rootSaga() {
    yield all([
        establishWebSocket(),
        watchSendMessage(),
        watchStartAndSendMessage(),
        // Other sagas
    ]);
}
