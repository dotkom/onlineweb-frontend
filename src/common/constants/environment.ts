/** Ternary statements are used to make sure enviroment is one of the specified strings */
export type NodeEnv = 'production' | 'development';
export const NODE_ENV = process.env.NODE_ENV === 'production' ? 'production' : 'development';
export const __PROD__ = NODE_ENV === 'production';
export const __DEV__ = NODE_ENV === 'development';

export type RendererEnv = 'client' | 'server';
export const __RENDERER__: RendererEnv = process.env.OWF_RENDERER === 'server' ? 'server' : 'client';
export const __SERVER__ = __RENDERER__ === 'server';
export const __CLIENT__ = __RENDERER__ === 'client';

const OWF_SSR = process.env.OWF_SSR as string | undefined | boolean;
export const __SSR__ = OWF_SSR === 'true' || OWF_SSR === true;
