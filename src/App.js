
import { Provider } from 'react-redux';
// import rootReducer from './reducers';
import MainApp from './MainApp';

import store from "./store";



function App() {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
}

export default App;
