import { configureStore  } from '@reduxjs/toolkit';

import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import mySaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const initialState = {};

const store = configureStore({
    reducer: rootReducer,
    middleware: [sagaMiddleware],
    preloadedState: initialState
  });



sagaMiddleware.run(mySaga);

export default store;
