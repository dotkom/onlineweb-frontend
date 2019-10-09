declare module 'react-helmet-async' {
  import * as React from 'react';

  // @ts-ignore
  import { Helmet, HelmetData } from 'react-helmet-async';

  // @ts-ignore
  export { Helmet, HelmetData };

  // tslint:disable-next-line:interface-name
  export interface PopulatedContext {
    helmet: HelmetData;
  }

  // tslint:disable-next-line:interface-name
  interface ProviderProps {
    context?: {};
  }

  // @ts-ignore
  export class HelmetProvider extends React.Component<ProviderProps> {}
}
