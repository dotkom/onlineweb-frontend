import PrefetchState, { PrefetchKey } from 'common/utils/PrefetchState';
import React, { Component, createContext } from 'react';

export interface IPreFetchState {
  queue: (fetcher: () => Promise<{}>, key: PrefetchKey) => void;
  get: (key: PrefetchKey) => {};
  has: (key: PrefetchKey) => boolean;
}

export interface IProps {
  prefetcher: PrefetchState;
}

const INITIAL_STATE: IPreFetchState = {
  queue: (_: (props: {}) => Promise<{}>) => {
    throw new Error('Queue method from initial state was not overwritten');
  },
  get: (_: PrefetchKey) => {
    throw new Error('Get method from initial state was not overwritten');
  },
  has: (_: PrefetchKey) => {
    throw new Error('Has method from initial state was not overwritten');
  },
};

export const PreFetchContext = createContext(INITIAL_STATE);

class Prefetched extends Component<IProps, IPreFetchState> {
  public state: IPreFetchState = { ...INITIAL_STATE };

  public render() {
    const { get, queue, has } = this.props.prefetcher;
    const value = { has, get, queue };
    return <PreFetchContext.Provider value={value}>{this.props.children}</PreFetchContext.Provider>;
  }
}

export default Prefetched;
