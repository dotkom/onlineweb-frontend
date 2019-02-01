import React, { Component, ContextType } from 'react';

import { UserContext } from 'authentication/providers/UserProvider';
import { Page } from 'common/components/Panes';
import Spinner from 'common/components/Spinner';
import { getPublicProfile } from 'profile/api/search';
import { IPublicProfile } from 'profile/models/User';
import { ProfilePageProvider } from 'profile/providers/ProfilePage';
import { MainProfile } from './MainProfile';

export interface IProps {
  profileId: number;
}

export interface IState {
  profile?: IPublicProfile;
}

export class PublicProfile extends Component<IProps> {
  public static contextType = UserContext;
  public context!: ContextType<typeof UserContext>;
  public state: IState = {};

  public init = async () => {
    const { user } = this.context;
    if (user) {
      const { profileId } = this.props;
      const profile = await getPublicProfile(profileId, user);
      this.setState({ profile });
    }
  };

  public async componentDidMount() {
    this.init();
  }

  public render() {
    const { profile } = this.state;
    return profile ? (
      <Page>
        <ProfilePageProvider profile={profile}>
          <MainProfile />
        </ProfilePageProvider>
      </Page>
    ) : (
      <Spinner />
    );
  }
}
