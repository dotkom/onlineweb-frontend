import React, { Component, ContextType } from 'react';

import { md } from 'common/components/Markdown';
import { Pane } from 'common/components/Panes';
import {
  getNotificationPermission,
  resolveNotificationPermission,
  verifyNotification,
} from 'common/utils/notification';
import { getNotificationSubscription, registerPushManager, verifyPushManager } from 'common/utils/pushManager';
import { getKeys } from 'common/utils/tsHacks';

import { UserContext } from 'authentication/providers/UserProvider';
import { subscribe } from 'profile/api/notifications';
import { verifyServiceWorker } from 'serviceworker/browser';

import { INotificationOption } from '../../../models/Notification';
import BrowserSupport from './BrowserSupport';
import style from './notifications.less';
import Option from './Option';

const ABOUT_NOTIFICATIONS = md`
  # Notifikasjoner

  Notifikasjoner kan brukes til å sende deg varsler for hendelser som skjer
  på nettsiden uten at du trenger å være på den direkte.

  ## Denne funksjonaliteten har ikke blitt ferdigimplementert!
`;

const ABOUT_BROWSER_SUPPORT = md`
  ### Nødvendige funksjoner

  For at det skal være mulig å bruke notifikasjoner fullt ut
  må følgende funksjonaliteter være tilgjengelige i nettleseren:
`;

const ABOUT_ENABLE_NOTIFICATIONS = md`
  ### Tillat Notifikasjoner

  For å kunne bruke dette må du gi oss tillatelse til å sende deg varsler.
  Dette er funksjonalitet bygget inn i nettleseren,
  og du må først gi tillatelse til å bruke det på hele nettstdet.
`;

const ABOUT_NOTIFICATION_OPTIONS = md`
  ### Alternativer

  Her kan du velge hvilke deler av nettsiden du ønsker å motta notifikasjoner.
`;

export interface IState {
  options: INotificationOption;
  allowNotifications: boolean;
  subscription?: PushSubscription;
  message?: string;
}

class Notifications extends Component<{}, IState> {
  public static contextType = UserContext;
  public context!: ContextType<typeof UserContext>;

  public state: IState = {
    allowNotifications: resolveNotificationPermission(),
    options: {
      articles: false,
      events: false,
      feedback: false,
      offlines: false,
    },
  };

  public async componentDidMount() {
    this.getCurrentSubscription();
  }

  public toggleGlobalNotifications = async () => {
    const permission = await getNotificationPermission();
    this.setState({ allowNotifications: permission });
  };

  public getCurrentSubscription = async () => {
    const subscription = await getNotificationSubscription();
    if (subscription) {
      this.setState({ subscription });
    }
  };

  public subscribe = async () => {
    const { subscription, message } = await registerPushManager();
    this.setState({ message, subscription });

    const { user } = this.context;
    if (user && subscription) {
      await subscribe(subscription, user);
    }
  };

  /**
   * @summary Toggles an option in state
   * @param {keyof INotificationOption} key Key of the option to toggle.
   */
  public toggleNotificationOption(key: keyof INotificationOption) {
    const { options } = this.state;
    const option = options[key];
    this.setState({ options: { ...options, [key]: !option } });
  }

  public render() {
    const { options, allowNotifications, subscription, message } = this.state;
    return (
      <>
        <Pane>{ABOUT_NOTIFICATIONS}</Pane>
        <Pane>
          {ABOUT_BROWSER_SUPPORT}
          <div className={style.container}>
            <BrowserSupport name="Notification" value={verifyNotification()} />
            <BrowserSupport name="PushManager" value={verifyPushManager()} />
            <BrowserSupport name="ServiceWorker" value={verifyServiceWorker()} />
          </div>
        </Pane>
        <Pane>
          {ABOUT_ENABLE_NOTIFICATIONS}
          <div className={style.container}>
            {message && md`**${message}**`}
            <Option option="allowNotifications" value={allowNotifications} toggle={this.toggleGlobalNotifications} />
            <Option option="subscription" value={!!subscription} toggle={this.subscribe} />
          </div>
        </Pane>
        <Pane>
          {ABOUT_NOTIFICATION_OPTIONS}
          <div className={style.container}>
            {getKeys<INotificationOption>(options).map((key) => (
              <Option
                key={key}
                option={key}
                value={options[key]}
                toggle={() => this.toggleNotificationOption(key)}
                disabled
              />
            ))}
          </div>
        </Pane>
      </>
    );
  }
}

export default Notifications;
