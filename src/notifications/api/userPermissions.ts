import { retrieveResource, listResource, partialUpdateResource } from 'common/resources';
import { IUserPermission, IUpdateUserPermission } from 'notifications/models/UserPermission';

const API_URL = '/api/v1/notifications/user-permissions';

export const listNotificationUserPermissions = listResource<IUserPermission>(API_URL);

export const retrieveNotificationUserPermission = retrieveResource<IUserPermission>(API_URL);

export const updateNotificationUserPermission = partialUpdateResource<IUpdateUserPermission, IUserPermission>(API_URL);
