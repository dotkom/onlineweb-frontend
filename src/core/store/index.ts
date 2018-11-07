import { createStore } from 'redux';
import { IAction } from '../actions/action';
import rootReducer from '../reducers';

const store: any = createStore(rootReducer);

export default store;
