export type ToastType = 'info' | 'success' | 'warning' | 'error' | 'basic';

export interface IToastMessage {
  id: number;
  content: string | JSX.Element;
  /** milliseconds */
  duration: number;
  type: ToastType;
}

export const DEFAULT_DURATION = 6 * 1000;
export const DEFAULT_TYPE: ToastType = 'info';

export const DEFAULT_MESSAGE: Partial<IToastMessage> = {
  duration: DEFAULT_DURATION,
  type: DEFAULT_TYPE,
};

export interface IToastSettings {
  overwrite: boolean;
  type: ToastType;
  duration: number;
}

export const DEFAULT_SETTINGS: IToastSettings = {
  overwrite: false,
  type: 'info',
  duration: 6000,
};
