
import { createStore, applyMiddleware } from 'redux';
import asyncAwait from 'redux-async-await';
import store from './store';
import { apiLogIn } from './actions';
import rootReducer from './reducers';

declare global {
  interface Window { // tslint:disable-line interface-name
    store: any;
    apiLogIn: Function; // tslint:disable-line
  }
}

window.store = applyMiddleware(asyncAwait)(createStore)(rootReducer);
window.apiLogIn = apiLogIn;

export default store;
