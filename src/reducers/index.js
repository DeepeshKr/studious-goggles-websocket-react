import { combineReducers } from 'redux';
import {dataReducer} from './dataReducer';
import {error} from "./error"
import websock from "./websock"

const rootReducer = combineReducers({
  data: dataReducer,
  error,
  websock,
  
});

export default rootReducer;
