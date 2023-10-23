// api.js
import axios from 'axios';

const API_SERVER = 'http://127.0.0.1:8080'
export const WS_SERVER = 'ws://localhost:8080/ws'


export function fetchChatRooms(payload) {
  
  // Make the API call using Axios
  return axios.get()
    .then(response => response.data)
    .catch(error => {
      throw new Error(error.message);
    });

 

}

export const GET_CHAT_ROOMS = () =>
axios.get(
  `${API_SERVER}/chat-rooms`,
  // payload,
  // tokenConfig()
);


export const CREATE_CHAT_ROOM = (payload) =>
axios.post(
  `${API_SERVER}/chat-rooms`,
  payload,
  // tokenConfig()
);




