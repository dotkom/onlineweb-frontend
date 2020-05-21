import React from 'react';

import { Pane } from 'common/components/Panes';
import { md } from 'common/components/Markdown';
import { useSelector } from 'core/redux/hooks';
import { State } from 'core/redux/Store';
import { permissionSelectors } from 'notifications/slices/permissions';
import { shallowEqual } from 'react-redux';
import { Permission } from './Permission';

const ABOUT_NOTIFICATION_OPTIONS = md`
  ### Tillatelser

  Du kan velge å motta varsler av hver type på enten e-post eller som pushvarsel.
  _Enkelte verdier er ikke mulig å velge, og enkelte kan ikke velges bort_
`;

export const Permissions = () => {
  const permissionIds = useSelector(selectPermissionIds(), shallowEqual);
  return (
    <Pane>
      {ABOUT_NOTIFICATION_OPTIONS}
      <table>
        <thead></thead>
        <tbody>
          <tr>
            <th>Beskrivelse</th>
            <th>Tillat e-post</th>
            <th>Tillat pushvarsel</th>
          </tr>
          {permissionIds.map((permissionId) => (
            <Permission key={permissionId} permissionId={permissionId} />
          ))}
        </tbody>
      </table>
    </Pane>
  );
};

const selectPermissionIds = () => (state: State) => {
  return permissionSelectors.selectIds(state).map(Number);
};
