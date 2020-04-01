import React, { ReactNodeArray, useContext, useEffect, useState } from 'react';

import { Message } from '@dotkomonline/design-system';
import { IUserContext, UserContext } from 'authentication/providers/UserProvider';
import useAsync from 'common/hooks/useAsync';
import { getUserConsent } from 'oidc_clients/api/user_consent';
import { revokeuserConsent } from 'oidc_clients/api/user_consent';
import OidcClient from 'oidc_clients/components/OidcClient/index';
import { IOidcClient } from 'oidc_clients/models/client';
import { IUserConsent } from 'oidc_clients/models/user_consent';

import style from './apps.less';

interface IRemoveState {
  client_id: number;
  client?: IOidcClient;
}

export const AppConnections = () => {
  const { user } = useContext<IUserContext>(UserContext);


  const [removeConsentState, setRemoveConsentState] = useState<IRemoveState>({
    client_id: -1,
    client: undefined,
  });

  const revokeRequest = useAsync<unknown, Error>(async () => {
    if (user && removeConsentState.client_id !== -1) {
      return await revokeuserConsent(user, removeConsentState.client_id);
    }
    return null;
  }, [user, removeConsentState]);

  const consentRequest = useAsync<IUserConsent[], Error>(async () => user ? await getUserConsent(user) : [], [user, removeConsentState]);
  let consentedApps: ReactNodeArray = [];

  useEffect(() => {
    if (removeConsentState.client_id !== -1 && consentRequest.status === 'resolved' && revokeRequest.status === 'resolved') {
      setRemoveConsentState({ ...removeConsentState, client_id: -1 });
    }
  }, [removeConsentState, consentRequest, revokeRequest]);

  if (consentRequest.status === 'resolved') {
    consentedApps = consentRequest.result.map((consent: IUserConsent) => {
      return (
        <li key={consent.id}>
          <OidcClient
            onRemove={() => {
              setRemoveConsentState({ client_id: consent.id, client: consent.client });
            }}
            client={consent.client}
          />
        </li>
      );
    });
  } else if (consentRequest.status === 'rejected') {
    consentedApps = [<li key="error">{consentRequest.error.message}</li>];
  }

  return (
    <div>
      {removeConsentState.client ? (
        <Message status="success">Apptilkobling fjernet for {removeConsentState.client.name}</Message>
      ) : null}
      {revokeRequest.status === 'rejected' ? <Message status="error">{revokeRequest.error.message}</Message> : null}
      <ul className={style.grid}>{consentedApps}</ul>
    </div>
  );
};
