declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.less';


declare module NodeJS  {
  interface Global {
    STATE_CACHE: any
  }
}
