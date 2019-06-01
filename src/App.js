import React from 'react';
import { Provider } from "react-redux";

import './App.css';
import Calendar from './modules/Calendar';
import configureStore from "./store";

const reduxStore = configureStore(window.REDUX_INITIAL_DATA);

function App() {
  return (
    <Provider store={reduxStore}>
      <div className="app">
        <Calendar />
      </div>
    </Provider>
  );
}

export default App;
