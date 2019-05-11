import * as H from 'history';
import { Context } from 'react';
import { match } from 'react-router-dom';

declare module 'react-router-dom' {
  // tslint:disable-next-line interface-name
  export interface RouterContext {
    history: H.History;
    location: H.Location<H.LocationState>;
    match: match<{}>;
  }

  // tslint:disable-next-line variable-name
  export const __RouterContext: Context<RouterContext>;
}
