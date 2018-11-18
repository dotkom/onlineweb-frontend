import { prefetch } from 'common/utils/prefetch';
import { getOfflines } from 'frontpage/api/offline';
import { IOfflineIssue } from 'frontpage/models/Offline';
import React, { Component, createContext } from 'react';

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

@prefetch('FrontpageOfflines')
class OfflineIssues extends Component<IProps, IOfflineIssuesState> {
  public static async getServerState(_: IProps): Promise<IOfflineIssue[]> {
    const offlines = await getOfflines(1);
    return offlines;
  }

  constructor(props: IProps) {
    super(props);

    /** If there is a cache from SSR, set it to state */
    this.state = { ...INITIAL_STATE, offlines: props.prefetch || [] };
  }

  public init = async () => this.getOfflines();

  public async getOfflines() {
    const offlines = await getOfflines(1);
    this.setState({ offlines });
  }

  public render() {
    const { init } = this;
    const value = { ...this.state, init };
    return <OfflineContext.Provider value={value}>{this.props.children}</OfflineContext.Provider>;
  }
}

export default OfflineIssues;
