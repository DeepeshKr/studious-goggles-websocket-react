// actions.js
export const ERROR = "ERROR"
export const FETCH_FAILURE = "FETCH_FAILURE"


export const ROOM_LOADING = "ROOM_LOADING"
export const SG_FETCH_CHAT_ROOM = "SG_FETCH_CHAT_ROOM"
export const FETCH_CHAT_ROOM = "FETCH_CHAT_ROOM"
export const SG_CREATE_CHAT_ROOM = "SG_CREATE_CHAT_ROOM"
export const CREATE_CHAT_ROOM = "CREATE_CHAT_ROOM"

export const FETCH_SUCCESS = "FETCH_SUCCESS"

export const ERROR_WEBSOCKET = "ERROR_WEBSOCKET"
export const PENDING_WEBSOCKET = "PENDING_WEBSOCKET"
export const CONNECT_WEBSOCKET = "CONNECT_WEBSOCKET"
export const SAGA_CONNECT_WEBSOCKET = "SAGA_CONNECT_WEBSOCKET"
export const MESSAGE_WEBSOCKET = "MESSAGE_WEBSOCKET"
export const SAGA_MESSAGE_WEBSOCKET = "SAGA_MESSAGE_WEBSOCKET"

export const SAGA_START_AND_MESSAGE_WEBSOCKET = "SAGA_START_AND_MESSAGE_WEBSOCKET"

export const DISCONNECT_WEBSOCKET = "DISCONNECT_WEBSOCKET"
export const SAGA_DISCONNECT_WEBSOCKET = "SAGA_DISCONNECT_WEBSOCKET"

// export const fetchDataRooms = payload => ({
//     type: FETCH_CHAT_ROOM,
//     payload,
//   });
  
//   export const createChatRoom = payload => ({
//     type: CREATE_CHAT_ROOM,
//     payload,
//   });

//   export const fetchDataSuccess = data => ({
//     type: FETCH_SUCCESS,
//     payload: data,
//   });
  
//   export const fetchFailure = error => ({
//     type: FETCH_FAILURE,
//     payload: error,
//   });
  