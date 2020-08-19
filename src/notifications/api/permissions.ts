import { retrieveResource, listResource } from 'common/resources';
import { IPermission } from 'notifications/models/Permission';

const API_URL = '/api/v1/notifications/permissions';

export const listNotificationPermissions = listResource<IPermission>(API_URL);

export const retrieveNotificationPermission = retrieveResource<IPermission>(API_URL);
