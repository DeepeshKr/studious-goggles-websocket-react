// reducers.js

import { ERROR_WEBSOCKET, PENDING_WEBSOCKET, CONNECT_WEBSOCKET, MESSAGE_WEBSOCKET, DISCONNECT_WEBSOCKET } from "../constants/actions"

const initialState = {
  ws: false,
  isConnected: false,
  message: {},
  error: false,
  pending: false
};

const webSocketReducer = (state = initialState, action) => {
  switch (action.type) {
    case PENDING_WEBSOCKET:
      return {
        ...state,
        pending: true,
      };

    case CONNECT_WEBSOCKET:
      return {
        ...state,
        isConnected: true,
        pending: false,
        ws: action.payload,
      };

    case MESSAGE_WEBSOCKET:
      return {
        ...state,
        message: {
          ...state.message,
          [action.payload.id]: action.payload,
        },
        pending: false,
      };
    case ERROR_WEBSOCKET:
      return {
        ...state,
        message: action.payload,
        pending: false,
      };

    case DISCONNECT_WEBSOCKET:
      return {
        ...state,
        isConnected: false,
        pending: false,
        ws: action.payload,
      };

    default:
      return state;
  }
};

export default webSocketReducer;
