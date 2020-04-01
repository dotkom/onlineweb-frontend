import React, { ReactNodeArray, useContext, useEffect, useState } from 'react';

import { Message } from '@dotkomonline/design-system';
import { IUserContext, UserContext } from 'authentication/providers/UserProvider';
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
  const { user } = useContext<IUserContext>(UserContext);

  const [removeClientState, setRemoveClientState] = useState<IRemoveState>({
    client_id: -1,
    client: undefined,
  });

  const removeClientRequest = useAsync<unknown, Error>(() => {
    if (user && removeClientState.client_id !== -1) {
      return deleteClient(user, removeClientState.client_id);
    }
    return Promise.resolve(null);
  }, [user, removeClientState]);

  const getClientsRequest = useAsync<IOidcClient[], Error>(async () => user ? await getMyClients(user) : [], [user, removeClientState]);

  let managedApps: ReactNodeArray = [];

  useEffect(() => {
    if (removeClientState.client_id !== -1 && removeClientRequest.status === 'resolved' && getClientsRequest.status === 'resolved') {
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
    managedApps = [<li key="error">Kunne ikke hente dine apper {getClientsRequest.error.message}</li>];
  }

  return (
    <div>
      {removeClientState.client ? (
        <Message status="success">Applikson slettet {removeClientState.client.name}</Message>
      ) : null}
      {removeClientRequest.status === 'rejected' ? <Message status="error">{removeClientRequest.error.message}</Message> : null}
      <ul className={style.grid}>{managedApps}</ul>
    </div>
  );
};
