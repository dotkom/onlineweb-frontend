import React, { useEffect, useCallback, useState } from 'react';

import { md } from 'common/components/Markdown';
import { Pane } from 'common/components/Panes';
import { verifyNotification } from 'common/utils/notification';
import { verifyPushManager } from 'common/utils/pushManager';

import { verifyServiceWorker } from 'serviceworker/browser';

import BrowserSupport from './BrowserSupport';
import style from './notifications.less';
import Option from './Option';
import { useSelector, useDispatch } from 'core/redux/hooks';
import { shallowEqual } from 'react-redux';
import {
  toggleDevicePermission,
  registerDeviceForPushNotifications,
  unregisterDeviceFromPushNotfications,
  resolveCurrentDeviceSubscription,
} from 'notifications/slices/subscriptions';
import { Permissions } from './Permissions';
import { fetchPermissions } from 'notifications/slices/permissions';
import { fetchUserPermissions } from 'notifications/slices/userPermissions';
import { __CLIENT__ } from 'common/constants/environment';

const ABOUT_NOTIFICATIONS = md`
  # Varsler

  Varsler er alle henvendelser du kan motta på via både e-post og pushvarsler fra Onlines nettsider.
  Du kan selv velge hvilke varsler du ønsker å motta, enten som e-post eller via push.
`;

const ABOUT_BROWSER_SUPPORT = md`
  ### Nettlesersøtte

  _Pushvarsler støttes foreløpig ikke på iPhone og iPad, fordi Apple har valgt å ikke implementere det._

  Hvis ikke følgende funksjonalitet er tilgjengelig kan det hjelpe å oppdatere nettleseren din.
`;

const ABOUT_ENABLE_NOTIFICATIONS = md`
  ### Tillat pushvarsler

  For å kunne bruke pushvarsler må du først gi tillatlse til å vise varsler i nettleseren.
`;

const Notifications = () => {
  const dispatch = useDispatch();
  const deviceSubscription = useSelector((state) => state.notificationSubscriptions.deviceSubscription, shallowEqual);
  const message = useSelector((state) => state.notificationSubscriptions.message);
  const allowNotifications = useSelector((state) => state.notificationSubscriptions.allowNotifications);
  const [notificationsSupported] = useState(verifyNotification());
  const [pushManagerSupported] = useState(verifyPushManager());
  const [serviceWorkerSUpported] = useState(verifyServiceWorker());

  const dispatchToggleDevicePermission = () => {
    dispatch(toggleDevicePermission());
  };

  const dispatchSubscribe = () => {
    dispatch(registerDeviceForPushNotifications());
  };

  const disaptchUnsubscribe = () => {
    dispatch(unregisterDeviceFromPushNotfications());
  };

  const dispatchResolveCurrentSubscription = useCallback(() => {
    dispatch(resolveCurrentDeviceSubscription());
  }, [dispatch]);

  const dispatcFetchPermissions = useCallback(() => {
    dispatch(fetchPermissions());
  }, [dispatch]);

  const dispatcFetchUserPermissions = useCallback(() => {
    dispatch(fetchUserPermissions());
  }, [dispatch]);

  useEffect(() => {
    dispatchResolveCurrentSubscription();
  }, [dispatchResolveCurrentSubscription]);

  useEffect(() => {
    dispatcFetchPermissions();
  }, [dispatcFetchPermissions]);

  useEffect(() => {
    dispatcFetchUserPermissions();
  }, [dispatcFetchUserPermissions]);

  return (
    <>
      <Pane>{ABOUT_NOTIFICATIONS}</Pane>
      <Pane>
        {ABOUT_BROWSER_SUPPORT}
        <div className={style.container}>
          {__CLIENT__ && (
            <>
              <BrowserSupport name="Notification" value={notificationsSupported} />
              <BrowserSupport name="PushManager" value={pushManagerSupported} />
              <BrowserSupport name="ServiceWorker" value={serviceWorkerSUpported} />
            </>
          )}
        </div>
      </Pane>
      <Pane>
        {ABOUT_ENABLE_NOTIFICATIONS}
        <div className={style.container}>
          {message && md`**${message}**`}
          <Option
            description="Tillat pushvarsler på dette nettstedet"
            name="allowNotifications"
            value={allowNotifications}
            toggle={dispatchToggleDevicePermission}
          />
          <Option
            description="Registrer denne enheten for å motta pushvarsler"
            name="subscription"
            value={!!deviceSubscription}
            toggle={!!deviceSubscription ? disaptchUnsubscribe : dispatchSubscribe}
          />
        </div>
      </Pane>
      <Permissions />
    </>
  );
};

export default Notifications;
