export type ToastType = 'info' | 'success' | 'warning' | 'error';

export interface IToastMessage {
  id: number;
  content: string;
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

export const getToastColor = (type: ToastType) => {
  switch (type) {
    /** Use event colors for now, since we dont have specific colors for this */
    case 'error':
      return '#eb536e';
    case 'warning':
      return '#faa21b';
    case 'success':
      return '#43b171';
    case 'info':
      return '#fff';
  }
};
