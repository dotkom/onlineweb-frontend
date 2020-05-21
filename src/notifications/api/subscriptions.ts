import { retrieveResource, listResource, createResource, destroyResource } from 'common/resources';
import { ISubscription, IDeviceSubscription } from 'notifications/models/Subscription';

const API_URL = '/api/v1/notifications/subscriptions';

export const listNotificationSubscriptions = listResource<ISubscription>(API_URL);

export const retrieveNotificationSubscription = retrieveResource<ISubscription>(API_URL);

export const createNotificationSubscription = createResource<IDeviceSubscription, ISubscription>(API_URL);

export const destroyNotificationSubscription = destroyResource(API_URL);
