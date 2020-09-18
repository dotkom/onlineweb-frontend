import React, { ReactNodeArray } from 'react';

import { Message } from '@dotkomonline/design-system';
import useAsync, { useAsyncDispatch } from 'common/hooks/useAsync';
import { getUserConsent } from 'oidc_clients/api/user_consent';
import { revokeuserConsent } from 'oidc_clients/api/user_consent';
import OidcClient from 'oidc_clients/components/OidcClient/index';
import { IUserConsent } from 'oidc_clients/models/user_consent';

import style from './apps.less';

export const AppConnections = () => {
  const [revokeRequest, dispatchRevokeRequest] = useAsyncDispatch(async (consent: IUserConsent) => {
    await revokeuserConsent(consent.id);
    return {
      client: consent.client,
    };
  });

  const consentRequest = useAsync(async () => await getUserConsent(), []);
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
      {revokeRequest.status === 'rejected' ? (
        <Message status="error">{(revokeRequest.error as Error).message}</Message>
      ) : null}
      <ul className={style.grid}>{consentedApps}</ul>
    </div>
  );
};
