// reducers.js
import {ROOM_LOADING, CREATE_CHAT_ROOM, FETCH_CHAT_ROOM, FETCH_SUCCESS} from "../constants/actions"

const initialState = {
    data: null,
    isLoading: false,
    error: null,
    chat_rooms: []
  };
  
  export function dataReducer(state = initialState, action) {
    switch (action.type) {
      case ROOM_LOADING:
        return { 
          ...state, 
          isLoading: true };
      case CREATE_CHAT_ROOM:
        return { 
          ...state , 
          created: action.payload,
          chat_rooms: [...state.chat_rooms, action.payload.data],
          isLoading: false, 
          error: action.payload.error };
      case FETCH_CHAT_ROOM:
          return {
             ...state, 
             ...action.payload,
             isLoading: false,
              error: null };
      case FETCH_SUCCESS:
        return { ...state, isLoading: false, data: action.payload };

      default:
        return state;
    }
  }
  