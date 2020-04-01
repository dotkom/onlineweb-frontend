import { DependencyList, Reducer, useEffect, useReducer } from 'react';


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



const useAsync = <T, E = unknown>(
  func: () => Promise<T>,
  deps?: DependencyList
): IState<T, E> => {
  
  const initialState: IState<T, E> = {
    result: undefined,
    error: undefined,
    status: 'init',
  };

  const [requestState, dispatch] = useReducer<Reducer<IState<T, E>, IAction<T, E>>>(asyncReducer, initialState);
  useEffect(() => {
    let canceled = false;
    dispatch({ type: 'pending' });
    func()
      .then((res) => {
        if (canceled) {
          return;
        }
        dispatch({ type: 'resolved', value: res });
      })
      .catch((err) => {
        if (canceled) {
          return;
        }
        dispatch({ type: 'rejected', value: err });
      });
        
    return () => {
      canceled = true;
    };
  }, deps);

  return requestState;
};

export default useAsync;
