import { createStore } from 'redux';
import rootReducer from '../reducers';

const store: any = createStore(rootReducer);

export default store;
