import { Context } from 'react';

declare module 'react' {
  export type ContextType<C extends Context<any>> = C extends Context<infer T> ? T : never;
}
