import {
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
  useStore as useReduxStore,
} from 'react-redux';

import { Dispatch, State, Thunk } from './Store';

/**
 * Expand of the base hooks of Redux by adding types.
 */

export const useDispatch = (...args: Parameters<typeof useReduxDispatch>) => useReduxDispatch<Dispatch>(...args);

export const useSelector: TypedUseSelectorHook<State> = useReduxSelector;

export const useStore = (...args: Parameters<typeof useReduxStore>) => useReduxStore(...args);

export const useThunk = <TReturn = void>(thunk: ReturnType<Thunk<TReturn>>) => {
  const dispatch = useDispatch();
  const store = useStore();
  return () => thunk(dispatch, store.getState);
};
