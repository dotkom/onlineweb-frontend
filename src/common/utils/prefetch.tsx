import { __SERVER__ } from 'common/constants/environment';
import { IPreFetchState, PreFetchContext } from 'common/providers/Prefetched';
import React from 'react';

export function prefetch(key: string) {
  return function wrap(WrappedComponent: typeof PrefetchableComponent): any {
    return class extends React.Component<{}> {
      public static contextType = PreFetchContext;
      public render() {
        const prefetcher: IPreFetchState = this.context;
        const fetcher = () => WrappedComponent.getServerState(this.props);
        let data;
        if (prefetcher.has(key)) {
          data = prefetcher.get(key);
        } else {
          prefetcher.queue(fetcher, key);
        }
        return <WrappedComponent prefetch={data} {...this.props} />;
      }
    };
  };
}

export interface IPrefetchedComponent {
  getServerState(props: any): Promise<any>;
}

/* tslint:disable-next-line */
export class PrefetchableComponent<P = {}, S = {}, SS = any> extends React.Component<P, S, SS> {
  public static async getServerState(_: any): Promise<any> {
    throw new Error('Static getServerState method of PrefetchableComponent was not overwritten in implemented class');
  }
}
