import {FETCH_FAILURE, ERROR} from "../constants/actions"

const initialState = {
    error: null,
    fetch_error: null
  };
  
  export function error(state = initialState, action) {
    switch (action.type) {
        case ERROR:
            return { ...state, isLoading: false, error: action.payload };
      case FETCH_FAILURE:
        return { ...state, isLoading: false,  error: action.payload, fetch_error: action.payload };
      default:
        return state;
    }
  }
  