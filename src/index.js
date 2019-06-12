import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunc from 'redux-thunk';

import Router from './router';
import './styles/index.css';
import reducer from './store';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunc)));

window.onload = () => {
  // document.fonts.onloadingdone = () => {
    ReactDOM.render(
        <Provider store={store}>
          <Router />
        </Provider>,
        document.getElementById('root')
    );
  // }
}
