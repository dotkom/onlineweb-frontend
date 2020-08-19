import React, { FC } from 'react';
import { useSelector, useDispatch } from 'core/redux/hooks';
import { State } from 'core/redux/Store';
import { permissionSelectors } from 'notifications/slices/permissions';
import { IPermission } from 'notifications/models/Permission';
import { userPermissionSelectors, fetchUpdateUserPermission } from 'notifications/slices/userPermissions';
import { Checkbox } from '@dotkomonline/design-system';

interface IProps {
  permissionId: number;
}

export const Permission: FC<IProps> = ({ permissionId }) => {
  const dispatch = useDispatch();
  const permission = useSelector(selectPermissionById(permissionId));
  const userPermission = useSelector(selectUserPermissionByPermissionId(permissionId));

  const allowEmail = permission.force_email || userPermission?.allow_email || permission.default_value_email;
  const allowPush = permission.force_push || userPermission?.allow_push || permission.default_value_push;

  const handleEmailClick = (value: boolean) => {
    if (userPermission) {
      dispatch(fetchUpdateUserPermission({ userPermissionId: userPermission.id, updateData: { allow_email: value } }));
    }
  };

  const handlePushClick = (value: boolean) => {
    if (userPermission) {
      dispatch(fetchUpdateUserPermission({ userPermissionId: userPermission.id, updateData: { allow_push: value } }));
    }
  };

  return (
    <tr>
      <td>{permission.permission_type_display}</td>
      <td>
        <Checkbox label="" disabled={!permission.allow_email} isChecked={allowEmail} onChange={handleEmailClick} />
      </td>
      <td>
        <Checkbox label="" disabled={!permission.allow_push} isChecked={allowPush} onChange={handlePushClick} />
      </td>
    </tr>
  );
};

const selectPermissionById = (permissionId: number) => (state: State) => {
  return permissionSelectors.selectById(state, permissionId) as IPermission;
};

const selectUserPermissionByPermissionId = (permissionId: number) => (state: State) => {
  return (
    userPermissionSelectors.selectAll(state).find((userPermission) => userPermission.permission === permissionId) ||
    null
  );
};
