import { createStore } from 'redux';
import rootReducer from '../reducers';
import { IAction } from '../actions/action';

const store: any = createStore(rootReducer);

export default store;
