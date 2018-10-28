import React, { Component } from 'react';
import Markdown from 'react-markdown';
import { INotificationOption } from '../../../models/Notification';
import {
  resolveNotificationPermission,
  getNotificationPermission,
  verifyNotification,
} from 'common/utils/notification';
import { registerServiceWorker, verifyServiceWorker } from 'common/utils/serviceWorker';
import { verifyPushManager } from 'common/utils/pushManager';
import Option from './Option';
import BrowserSupport from './BrowserSupport';
import { getKeys } from 'common/utils/tsHacks';
import style from './notifications.less';

const ABOUT_NOTIFICATIONS = `
  # Notifikasjoner
  Notifikasjoner kan brukes til å sende deg varsler for hendelser som skjer
  på nettsiden uten at du trenger å være på den direkte.
`;

const ABOUT_BROWSER_SUPPORT = `
  ### Nødvendige funksjoner

  For at det skal være mulig å bruke notifikasjoner fullt ut
  må følgende funksjonaliteter være tilgjengelige i nettleseren:
`;

const ABOUT_ENABLE_NOTIFICATIONS = `
  ### Tillat Notifikasjoner
  For å kunne bruke dette må du gi oss tillatelse til å sende deg varsler.
  Dette er funksjonalitet bygget inn i nettleseren,
  og du må først gi tillatelse til å bruke det på hele nettstdet.
`;

const ABOUT_NOTIFICATION_OPTIONS = `
  ### Alternativer

  Her kan du velge hvilke deler av nettsiden du ønsker å motta notifikasjoner.
`;

export interface IState {
  options: INotificationOption;
  allow_notifications: boolean;
}

class Notifications extends Component<{}, IState> {
  public state: IState = {
    allow_notifications: resolveNotificationPermission(),
    options: {
      articles: false,
      events: false,
      feedback: false,
      offlines: false,
    },
  };

  public async componentDidMount() {
    const serviceWorker = await registerServiceWorker();
    console.log(serviceWorker);
  }

  public toggleGlobalNotifications = async () => {
    const permission = await getNotificationPermission();
    this.setState({ allow_notifications: permission });
  }

  /**
   * @summary Toggles an option in state
   * @param {keyof INotificationOption} key Key of the option to toggle.
   */
  public toggleNotificationOption(key: keyof INotificationOption) {
    const { options } = this.state;
    const option = options[key];
    this.setState({ options: { ...options, [key]: !option }});
  }

  public render() {
    const { options, allow_notifications } = this.state;
    return (
      <div>
        <Markdown source={ABOUT_NOTIFICATIONS} />
        <Markdown source={ABOUT_BROWSER_SUPPORT} />
        <div className={style.container}>
          <BrowserSupport name="Notification" value={verifyNotification()} />
          <BrowserSupport name="PushManager" value={verifyPushManager()} />
          <BrowserSupport name="ServiceWorker" value={verifyServiceWorker()} />
        </div>
        <Markdown source={ABOUT_ENABLE_NOTIFICATIONS} />
        <div>
          <Option
            key="allow_notifications"
            option="allow_notifications"
            value={allow_notifications}
            toggle={this.toggleGlobalNotifications}
          />
        </div>
        <Markdown source={ABOUT_NOTIFICATION_OPTIONS} />
        <div className={style.container}>
          { getKeys<INotificationOption>(options).map((key) => (
            <Option
              key={key}
              option={key}
              value={options[key]}
              toggle={() => this.toggleNotificationOption(key)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Notifications;
