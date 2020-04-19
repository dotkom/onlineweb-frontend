import React, { ReactNodeArray, useContext } from 'react';

import { Message } from '@dotkomonline/design-system';
import { IUserContext, UserContext } from 'authentication/providers/UserProvider';
import useAsync, { useAsyncDispatch } from 'common/hooks/useAsync';
import { getUserConsent } from 'oidc_clients/api/user_consent';
import { revokeuserConsent } from 'oidc_clients/api/user_consent';
import OidcClient from 'oidc_clients/components/OidcClient/index';
import { IUserConsent } from 'oidc_clients/models/user_consent';

import style from './apps.less';


export const AppConnections = () => {
  const { user } = useContext<IUserContext>(UserContext);

  const [revokeRequest, dispatchRevokeRequest] = useAsyncDispatch(async (consent: IUserConsent) => {
    if (user) {
      await revokeuserConsent(user, consent.id);
      return {
        client: consent.client
      }
    }
    throw new Error("User not logged in");
  });



  const consentRequest = useAsync(async () => user ? await getUserConsent(user) : [], [user]);
  let consentedApps: ReactNodeArray = [];


  if (consentRequest.status === 'resolved') {
    consentedApps = consentRequest.result.map((consent: IUserConsent) => {
      return (
        <li key={consent.id}>
          <OidcClient
            onRemove={() => {
              dispatchRevokeRequest(consent);
            }}
            client={consent.client}
          />
        </li>
      );
    });
  } else if (consentRequest.status === 'rejected') {
    consentedApps = [<li key="error">{(consentRequest.error as Error).message}</li>];
  }

  return (
    <div>
      {revokeRequest.status === 'resolved' ? (
        <Message status="success">Apptilkobling fjernet for {revokeRequest.result.client.name}</Message>
      ) : null}
      {revokeRequest.status === 'rejected' ? <Message status="error">{(revokeRequest.error as Error).message}</Message> : null}
      <ul className={style.grid}>{consentedApps}</ul>
    </div>
  );
};
