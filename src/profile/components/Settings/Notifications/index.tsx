import React, { Component, ContextType } from 'react';

import { md } from 'common/components/Markdown';
import { Pane } from 'common/components/Panes';
import {
  getNotificationPermission,
  resolveNotificationPermission,
  verifyNotification,
} from 'common/utils/notification';
import { getNotificationSubscription, registerPushManager, verifyPushManager } from 'common/utils/pushManager';

import { UserContext } from 'authentication/providers/UserProvider';
import { getAllChannels, getUserChannels, postUserChannels, subscribe } from 'profile/api/notifications';
import { verifyServiceWorker } from 'serviceworker/browser';

import { IChannel } from '../../../models/Notification';
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
  channels: IChannel[];
  selectedChannels: string[];
  allowNotifications: boolean;
  subscription?: PushSubscription;
  message?: string;
}

class Notifications extends Component<{}, IState> {
  public static contextType = UserContext;
  public context!: ContextType<typeof UserContext>;

  public state: IState = {
    allowNotifications: resolveNotificationPermission(),
    channels: [],
    selectedChannels: [],
  };

  public async componentDidMount() {
    this.getCurrentSubscription();
    this.getAllChannels();
    this.getUserChannels();
  }

  public getAllChannels = async () => {
    const { user } = this.context;
    if (user) {
      const channels = await getAllChannels(user);
      this.setState({ channels });
    }
  };

  public getUserChannels = async () => {
    const { user } = this.context;
    if (user) {
      const selectedChannels = await getUserChannels(user);
      this.setState({ selectedChannels });
    }
  };

  public toggleChannel = (channelName: string) => {
    const { selectedChannels } = this.state;
    const channels = selectedChannels.includes(channelName)
      ? selectedChannels.filter((i) => i !== channelName)
      : [...selectedChannels, channelName];
    this.setState({ selectedChannels: channels }, this.updateChannels);
  };

  public updateChannels = async () => {
    const { user } = this.context;
    const { selectedChannels } = this.state;
    if (user) {
      const selected = await postUserChannels(selectedChannels, user);
      this.setState({ selectedChannels: selected });
    }
  };

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

  public render() {
    const { channels, allowNotifications, subscription, message } = this.state;
    const { selectedChannels } = this.state;
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
            <Option
              description="Tillat notifikasjoner på dette nettstedet"
              name="allowNotifications"
              value={allowNotifications}
              toggle={this.toggleGlobalNotifications}
            />
            <Option
              description="Registrer denne enheten for å motta notifikasjoner"
              name="subscription"
              value={!!subscription}
              toggle={this.subscribe}
            />
          </div>
        </Pane>
        <Pane>
          {ABOUT_NOTIFICATION_OPTIONS}
          <div className={style.container}>
            {channels.map((channel) => (
              <Option
                key={channel.name}
                name={channel.name}
                description={channel.description}
                value={selectedChannels.includes(channel.name)}
                toggle={() => this.toggleChannel(channel.name)}
              />
            ))}
          </div>
        </Pane>
      </>
    );
  }
}

export default Notifications;
