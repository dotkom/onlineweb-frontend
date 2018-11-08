import { createStore, Store } from 'redux';
import rootReducer, { IAction, IState } from '../reducers';

const store = createStore(rootReducer);

export default store;
