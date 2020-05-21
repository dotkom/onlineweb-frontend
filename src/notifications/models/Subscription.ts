export interface ISubscription {
  id: number;
  endpoint: string;
  auth: string;
  p256dh: string;
}

export interface IDeviceSubscription {
  endpoint: string;
  auth: string;
  p256dh: string;
}
