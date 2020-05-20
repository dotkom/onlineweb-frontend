import React, { ReactNodeArray, useEffect, useState } from 'react';

import { Message } from '@dotkomonline/design-system';
import useAsync from 'common/hooks/useAsync';
import { deleteClient, getMyClients } from 'oidc_clients/api/clients';
import OidcClient from 'oidc_clients/components/OidcClient/index';
import { IOidcClient } from 'oidc_clients/models/client';

import style from './apps.less';

interface IRemoveState {
  client_id: number;
  client?: IOidcClient;
}

export const ManageApps = () => {
  const [removeClientState, setRemoveClientState] = useState<IRemoveState>({
    client_id: -1,
    client: undefined,
  });

  const removeClientRequest = useAsync(() => {
    if (removeClientState.client_id !== -1) {
      return deleteClient(removeClientState.client_id);
    }
    return Promise.resolve(null);
  }, [removeClientState]);

  const getClientsRequest = useAsync(async () => await getMyClients(), [removeClientState]);

  let managedApps: ReactNodeArray = [];

  useEffect(() => {
    if (
      removeClientState.client_id !== -1 &&
      removeClientRequest.status === 'resolved' &&
      getClientsRequest.status === 'resolved'
    ) {
      setRemoveClientState({ ...removeClientState, client_id: -1 });
    }
  }, [removeClientState, removeClientRequest, getClientsRequest.status]);

  if (getClientsRequest.status === 'resolved') {
    managedApps = getClientsRequest.result.map((client: IOidcClient) => {
      return (
        <li key={client.id}>
          <OidcClient
            onRemove={() => setRemoveClientState({ client_id: client.id, client })}
            client={client}
            manage={true}
          />
        </li>
      );
    });
  } else if (getClientsRequest.status === 'rejected') {
    managedApps = [<li key="error">Kunne ikke hente dine apper {(getClientsRequest.error as Error).message}</li>];
  }

  return (
    <div>
      {removeClientState.client ? (
        <Message status="success">Applikson slettet {removeClientState.client.name}</Message>
      ) : null}
      {removeClientRequest.status === 'rejected' ? (
        <Message status="error">{(getClientsRequest.error as Error).message}</Message>
      ) : null}
      <ul className={style.grid}>{managedApps}</ul>
    </div>
  );
};
