import { retrieveResource, listResource } from 'common/resources';
import { INotification } from 'notifications/models/Notification';

const API_URL = '/api/v1/notifications/messages';

export const listNotificationMessages = listResource<INotification>(API_URL);

export const retrieveNotificationMessage = retrieveResource<INotification>(API_URL);
