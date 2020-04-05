/** Ternary statements are used to make sure enviroment is one of the specified strings */
export type NodeEnv = 'production' | 'development';
export const NODE_ENV = process.env.NODE_ENV === 'production' ? 'production' : 'development';
export const __PROD__ = NODE_ENV === 'production';
export const __DEV__ = NODE_ENV === 'development';

export const __SERVER__ = !process.browser;
export const __CLIENT__ = process.browser;
