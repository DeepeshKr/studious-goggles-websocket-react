import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import MainApp from './MainApp';

const store = createStore(rootReducer);

function App() {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
}

export default App;
