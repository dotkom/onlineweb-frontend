import { createStore, Store } from "redux";
import rootReducer, { IState, IAction } from "../reducers";

const store = createStore(rootReducer);

export default store;
