import { DependencyList, Reducer, useEffect, useReducer, useCallback, useRef } from 'react';


// Interface for each possible state with explicit values for each
// Allows use to infer what type error and result is based on the value of state,
// however this information is lost when destructuring the object: (const {result, error, status} = state)
// https://github.com/microsoft/TypeScript/issues/27497

interface IStateResolved<T>  {
  result: T;
  error: undefined,
  status: 'resolved';
}

interface IStateRejected<E>  {
  result: undefined
  error: E;
  status: 'rejected';
}

interface IStateInit  {
  result: undefined;
  error: undefined;
  status: 'init';
}

interface IStatePending {
  result: undefined;
  error: undefined;
  status: 'pending';
}

type IState<T,E> = IStateInit | IStatePending | IStateResolved<T> | IStateRejected<E>


interface IActionPending{
  type: 'pending'
}

interface IActionResolved<T>{
  type: 'resolved',
  value: T
}

interface IActionRejected<E>{
  type: 'rejected',
  value: E
}


type IAction<T, E> = IActionPending | IActionResolved<T> | IActionRejected<E>

const asyncReducer = <T, E>(state: IState<T, E>, action: IAction<T, E>): IState<T, E> => {
  switch (action.type) {
    case 'pending':
      return {
        result: undefined,
        error: undefined,
        status: 'pending',
      };
    case 'resolved':
      return {
        result: action.value,
        error: undefined,
        status: 'resolved',
      };
    case 'rejected':
      return {
        result: undefined,
        error: action.value,
        status: 'rejected',
      };
  }
  return state;
};

type FuncSig<T> = (...args: any[]) => Promise<T>

type Unpacked<T> = T extends (infer U)[]
  ? U
  : T extends (...args: any[]) => infer U
  ? U
  : T extends Promise<infer U>
  ? U
  : T;


// automatically calls dispatch when dependencies have changed
export const useAsync = <X extends FuncSig<any> = FuncSig<any>>(
  func: X,
  deps?: DependencyList
): IState<Unpacked<ReturnType<typeof func>>, unknown> => {
  const [requestState, dispatch] = useAsyncDispatch<X>(func);
  useEffect(dispatch, deps);
  return requestState;
}



//<T extends (...args: any[]) => any>
export const useAsyncDispatch = <X extends FuncSig<any> = FuncSig<any>>(
  func: X
): [IState<Unpacked<ReturnType<typeof func>>, unknown>, (...args: Parameters<typeof func>) => () => void] => {
  type T = Unpacked<ReturnType<typeof func>>;
  type E = unknown;
  
  
  const initialState: IState<T, E> = {
    result: undefined,
    error: undefined,
    status: 'init',
  };

  const [requestState, dispatch] = useReducer<Reducer<IState<T, E>, IAction<T, E>>>(asyncReducer, initialState);
  
  // mutable object that keeps track of all requests
  const inFlightTracker = useRef<{nextId: number, canceled: {[key: number]: boolean}}>({
    nextId: 1,
    canceled: {}
  });

  const doRequest = useCallback((...args: Parameters<typeof func>) => {
    
    let id = inFlightTracker.current.nextId += 1;
    // cancel previous request
    inFlightTracker.current.canceled[id-1] = true;
    inFlightTracker.current.canceled[id] = false;
    dispatch({ type: 'pending' });
    func(...args)
      .then((res) => {
        if (inFlightTracker.current.canceled[id]) {
          return;
        }
        dispatch({ type: 'resolved', value: res });
      })
      .catch((err) => {
        if (inFlightTracker.current.canceled[id]) {
          return;
        }
        dispatch({ type: 'rejected', value: err });
      });
    
    return () => {
      inFlightTracker.current.canceled[id] = true;
    }
    
  }, [func]);

  return [requestState, doRequest];
};


export default useAsync;
