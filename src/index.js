import '@babel/polyfill';
import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import App from './app'
import rootReducer from './app/reducers'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './app/sagas'
import axios from 'axios';
import config from './config/env';


// 如果设置有环境变量，则根据环境变量NODE_PROFILE改变baseURL
const NODE_PROFILE = process && process.env && process.env.NODE_PROFILE;
if(config[NODE_PROFILE] && config[NODE_PROFILE].baseURL) {
    axios.defaults.baseURL = config[NODE_PROFILE].baseURL;
    axios.defaults.withCredentials = true;
}

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

// mount it on the Store
const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
)

// then run the saga
sagaMiddleware.run(rootSaga)

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
