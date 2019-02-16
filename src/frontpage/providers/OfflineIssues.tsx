import React, { Component, createContext } from 'react';

import { prefetch } from 'common/utils/prefetch';
import { PrefetchKey } from 'common/utils/PrefetchState';
import { getOfflines } from 'frontpage/api/offline';
import { IOfflineIssue } from 'frontpage/models/Offline';

export interface IOfflineIssuesState {
  offlines: IOfflineIssue[];
  init: () => void;
}

const INITIAL_STATE: IOfflineIssuesState = {
  offlines: [],
  init: async () => {
    throw new Error('Init state was called before component was initialized');
  },
};

export interface IProps {
  prefetch?: IOfflineIssue[];
}

export const OfflineContext = createContext(INITIAL_STATE);

@prefetch(PrefetchKey.OFFLINES)
class OfflineIssues extends Component<IProps, IOfflineIssuesState> {
  public static async getServerState(_: IProps): Promise<IOfflineIssue[]> {
    const data = await getOfflines(1);
    return data.results;
  }

  constructor(props: IProps) {
    super(props);

    /** If there is a cache from SSR, set it to state */
    this.state = { ...INITIAL_STATE, offlines: props.prefetch || [] };
  }

  public init = async () => this.getOfflines();

  public async getOfflines() {
    const { results } = await getOfflines(1);
    this.setState({ offlines: results });
  }

  public render() {
    const { init } = this;
    const value = { ...this.state, init };
    return <OfflineContext.Provider value={value}>{this.props.children}</OfflineContext.Provider>;
  }
}

export default OfflineIssues;
