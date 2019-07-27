import {
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
  useStore as useReduxStore,
} from 'react-redux';

import { Dispatch, State, Store, Thunk } from './types';

/**
 * Expand of the base hooks of Redux by adding types.
 */

export const useDispatch: () => Dispatch = useReduxDispatch;

export const useSelector: TypedUseSelectorHook<State> = useReduxSelector;

export const useStore: () => Store = useReduxStore;

export const useThunk = <TReturn = void>(thunk: ReturnType<Thunk<TReturn>>) => {
  const dispatch = useDispatch();
  const store = useStore();
  return () => thunk(dispatch, store.getState);
};
